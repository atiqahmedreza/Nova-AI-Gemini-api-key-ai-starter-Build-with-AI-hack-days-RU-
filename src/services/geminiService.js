import { GoogleGenAI } from '@google/genai'
import {
  GEMINI_API_KEY,
  GEMINI_FALLBACK_MODELS,
  GEMINI_MODEL,
} from '../constants/appConfig'
import { getSystemPrompt } from '../constants/prompts'
import { AppError, ERROR_CODES, mapGeminiError } from '../utils/errors'

let client = null
let clientKey = ''

function getClient() {
  const apiKey = String(
    import.meta.env.VITE_GEMINI_API_KEY || GEMINI_API_KEY || '',
  ).trim()

  if (!apiKey) {
    throw new AppError(
      ERROR_CODES.CONFIG,
      'Missing VITE_GEMINI_API_KEY. Add it to your .env file and restart the server.',
    )
  }

  if (!client || clientKey !== apiKey) {
    client = new GoogleGenAI({ apiKey })
    clientKey = apiKey
  }

  return client
}

function getModelCandidates(preferred) {
  return [...new Set([preferred, ...GEMINI_FALLBACK_MODELS].filter(Boolean))]
}

function isRetryableModelError(error) {
  const status = Number(error?.status || error?.code || 0)
  const raw = String(error?.message || '').toLowerCase()
  return (
    status === 404 ||
    status === 429 ||
    raw.includes('quota') ||
    raw.includes('rate limit') ||
    raw.includes('no longer available') ||
    raw.includes('not found')
  )
}

/**
 * Convert local chat messages into Gemini contents.
 * Local roles: 'user' | 'assistant'
 */
export function toGeminiContents(messages = []) {
  return messages
    .filter((message) => message?.content?.trim() && message.role !== 'system')
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }))
}

async function generateWithModel({
  ai,
  model,
  contents,
  systemInstruction,
}) {
  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  })

  const text = String(response?.text || '').trim()

  if (!text) {
    throw new AppError(
      ERROR_CODES.API,
      'The model returned an empty response. Try rephrasing your question.',
    )
  }

  return { text, model }
}

/**
 * Reusable Gemini boundary — the only place that talks to Google Gen AI.
 */
export async function sendMessage({
  history = [],
  userMessage,
  systemInstruction = getSystemPrompt('chatbot'),
  model = GEMINI_MODEL,
} = {}) {
  const trimmed = String(userMessage || '').trim()

  if (!trimmed) {
    throw new AppError(ERROR_CODES.EMPTY, 'Message cannot be empty.')
  }

  const ai = getClient()
  const contents = [
    ...toGeminiContents(history),
    { role: 'user', parts: [{ text: trimmed }] },
  ]

  const candidates = getModelCandidates(model)
  let lastError = null

  for (const candidate of candidates) {
    try {
      return await generateWithModel({
        ai,
        model: candidate,
        contents,
        systemInstruction,
      })
    } catch (error) {
      if (error instanceof AppError && error.code === ERROR_CODES.EMPTY) {
        throw error
      }

      lastError = error
      if (!isRetryableModelError(error)) {
        throw mapGeminiError(error)
      }
    }
  }

  throw mapGeminiError(lastError)
}

export function hasApiKey() {
  return Boolean(String(import.meta.env.VITE_GEMINI_API_KEY || '').trim())
}
