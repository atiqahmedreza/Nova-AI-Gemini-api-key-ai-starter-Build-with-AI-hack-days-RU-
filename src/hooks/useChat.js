import { useCallback, useState } from 'react'
import { useChatContext } from '../context/ChatContext'
import { useToast } from '../context/ToastContext'
import { sendMessage } from '../services/geminiService'
import { getSystemPrompt } from '../constants/prompts'
import { AppError, ERROR_CODES, toUserMessage } from '../utils/errors'
import { createId } from '../utils/format'

export function useChat() {
  const {
    activeSession,
    ensureActiveSession,
    appendMessage,
    clearActiveMessages,
    createSession,
  } = useChatContext()
  const { pushToast } = useToast()
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)

  const send = useCallback(
    async (rawText) => {
      const content = String(rawText || '').trim()

      if (!content) {
        const emptyError = new AppError(
          ERROR_CODES.EMPTY,
          'Type a message before sending.',
        )
        setError(emptyError.message)
        pushToast({ type: 'warning', message: emptyError.message })
        return
      }

      if (isSending) return

      const session = ensureActiveSession()
      const history = session.messages
      const userMessage = {
        id: createId('msg'),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      }

      appendMessage(session.id, userMessage)
      setIsSending(true)
      setError(null)

      try {
        const { text } = await sendMessage({
          history,
          userMessage: content,
          systemInstruction: getSystemPrompt('chatbot'),
        })

        appendMessage(session.id, {
          id: createId('msg'),
          role: 'assistant',
          content: text,
          createdAt: new Date().toISOString(),
        })
      } catch (err) {
        const message = toUserMessage(err)
        setError(message)
        pushToast({ type: 'error', message })
      } finally {
        setIsSending(false)
      }
    },
    [
      appendMessage,
      ensureActiveSession,
      isSending,
      pushToast,
    ],
  )

  const clearChat = useCallback(() => {
    clearActiveMessages()
    setError(null)
    pushToast({ type: 'success', message: 'Chat cleared.' })
  }, [clearActiveMessages, pushToast])

  const newChat = useCallback(() => {
    createSession()
    setError(null)
    pushToast({ type: 'info', message: 'Started a new chat.' })
  }, [createSession, pushToast])

  const dismissError = useCallback(() => setError(null), [])

  return {
    activeSession,
    isSending,
    error,
    send,
    clearChat,
    newChat,
    dismissError,
  }
}
