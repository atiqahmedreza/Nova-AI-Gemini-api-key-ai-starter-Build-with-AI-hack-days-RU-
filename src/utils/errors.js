export const ERROR_CODES = {
  EMPTY: 'EMPTY',
  NETWORK: 'NETWORK',
  API: 'API',
  RATE_LIMIT: 'RATE_LIMIT',
  CONFIG: 'CONFIG',
  UNKNOWN: 'UNKNOWN',
}

export class AppError extends Error {
  constructor(code, message, cause) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.cause = cause
  }
}

export function toUserMessage(error) {
  if (error instanceof AppError) return error.message

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

function extractApiMessage(error) {
  const direct = String(error?.message || '')

  try {
    const parsed = JSON.parse(direct)
    if (parsed?.error?.message) return String(parsed.error.message)
  } catch {
    // not JSON
  }

  const nested = error?.error?.message
  if (typeof nested === 'string' && nested.trim()) return nested

  return direct
}

export function mapGeminiError(error) {
  const apiMessage = extractApiMessage(error)
  const raw = apiMessage.toLowerCase()
  const status = Number(error?.status || error?.code || error?.error?.code || 0)

  if (
    (typeof navigator !== 'undefined' && navigator.onLine === false) ||
    raw.includes('failed to fetch') ||
    raw.includes('networkerror') ||
    raw.includes('network')
  ) {
    return new AppError(
      ERROR_CODES.NETWORK,
      'Network failure. Check your connection and try again.',
      error,
    )
  }

  if (
    status === 429 ||
    raw.includes('quota') ||
    raw.includes('rate limit') ||
    raw.includes('resource_exhausted')
  ) {
    return new AppError(
      ERROR_CODES.RATE_LIMIT,
      'Rate limit or quota reached. Wait a moment, then retry — or switch model in .env.',
      error,
    )
  }

  if (
    status === 404 ||
    raw.includes('no longer available') ||
    raw.includes('not found') ||
    raw.includes('is not found for api version')
  ) {
    return new AppError(
      ERROR_CODES.API,
      'Selected Gemini model is unavailable. Set VITE_GEMINI_MODEL=gemini-flash-latest in .env and restart.',
      error,
    )
  }

  if (
    status === 401 ||
    status === 403 ||
    raw.includes('api key') ||
    raw.includes('permission') ||
    raw.includes('unauthorized') ||
    raw.includes('invalid x-goog-api-key') ||
    raw.includes('api_key_invalid')
  ) {
    return new AppError(
      ERROR_CODES.API,
      'API request failed. Verify your Gemini API key in .env and restart the dev server.',
      error,
    )
  }

  if (status >= 400 || apiMessage) {
    return new AppError(
      ERROR_CODES.API,
      apiMessage
        ? `Gemini error: ${apiMessage}`
        : 'The AI service returned an error. Please try again.',
      error,
    )
  }

  return new AppError(
    ERROR_CODES.UNKNOWN,
    'Unexpected error while generating a response.',
    error,
  )
}
