import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { hasApiKey } from '../../services/geminiService'
import { useChat } from '../../hooks/useChat'
import { QUICK_TEMPLATES } from '../../constants/templates'
import ErrorBanner from '../common/ErrorBanner'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

export default function ChatWindow() {
  const { activeSession, isSending, error, send, dismissError } = useChat()
  const configured = hasApiKey()
  const messages = activeSession?.messages || []
  const location = useLocation()
  const navigate = useNavigate()
  const { queuedPrompt, setQueuedPrompt } = useOutletContext() || {}
  const handledRoutePrompt = useRef(false)

  useEffect(() => {
    if (handledRoutePrompt.current) return

    const prompt = location.state?.prompt
    const templateId = location.state?.templateId
    let nextPrompt = prompt

    if (!nextPrompt && templateId) {
      nextPrompt = QUICK_TEMPLATES.find((item) => item.id === templateId)?.prompt
    }

    if (nextPrompt) {
      handledRoutePrompt.current = true
      send(nextPrompt)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate, send])

  useEffect(() => {
    if (!queuedPrompt?.text) return
    send(queuedPrompt.text)
    setQueuedPrompt?.(null)
  }, [queuedPrompt, send, setQueuedPrompt])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 pt-4 md:px-6">
          {!configured ? (
            <ErrorBanner
              className="mb-4"
              message="Add VITE_GEMINI_API_KEY to your .env file, then restart npm run dev."
            />
          ) : null}
          {error ? (
            <ErrorBanner className="mb-4" message={error} onDismiss={dismissError} />
          ) : null}
        </div>

        <MessageList
          messages={messages}
          isSending={isSending}
          onSelectPrompt={send}
        />
      </div>

      <ChatInput onSend={send} isSending={isSending} disabled={!configured} />
    </div>
  )
}
