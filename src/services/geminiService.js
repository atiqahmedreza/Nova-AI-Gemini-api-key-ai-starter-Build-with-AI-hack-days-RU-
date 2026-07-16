import { GoogleGenAI } from '@google/genai'
import { GEMINI_API_KEY, GEMINI_MODEL } from '../constants/appConfig'
import { getSystemPrompt } from '../constants/prompts'
import { AppError, ERROR_CODES, mapGeminiError } from '../utils/errors'

let client = null

function getClient() {
  if (!GEMINI_API_KEY) {
    throw new AppError(
      ERROR_CODES.CONFIG,
      'Missing VITE_GEMINI_API_KEY. Add it to your .env file and restart the server.',
    )
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
  }

  return client
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

/**
 * Reusable Gemini boundary — the only place that talks to Google Gen AI.
 *
 * @param {{ history?: Array, userMessage: string, systemInstruction?: string, model?: string }} params
 * @returns {Promise<{ text: string }>}
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

  try {
    const ai = getClient()
    const contents = [
      ...toGeminiContents(history),
      { role: 'user', parts: [{ text: trimmed }] },
    ]

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

    return { text }
  } catch (error) {
    if (error instanceof AppError) throw error
    throw mapGeminiError(error)
  }
}

export function hasApiKey() {
  return Boolean(String(import.meta.env.VITE_GEMINI_API_KEY || '').trim())
}
