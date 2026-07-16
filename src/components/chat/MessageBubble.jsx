import { useState } from 'react'
import { HiClipboard, HiCheck, HiSparkles, HiUser } from 'react-icons/hi2'
import { useToast } from '../../context/ToastContext'
import { cn } from '../../utils/cn'
import MarkdownRenderer from './MarkdownRenderer'
import TypingIndicator from './TypingIndicator'

export default function MessageBubble({ message, isTyping = false }) {
  const isUser = message?.role === 'user'
  const { pushToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content || '')
      setCopied(true)
      pushToast({ type: 'success', message: 'Response copied.' })
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      pushToast({ type: 'error', message: 'Could not copy response.' })
    }
  }

  return (
    <div
      className={cn(
        'flex w-full gap-3 animate-slide-up',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-btn-gradient text-white shadow-glow">
          <HiSparkles className="h-4 w-4" />
        </div>
      ) : null}

      <div
        className={cn(
          'group relative max-w-[min(100%,42rem)] rounded-3xl px-4 py-3 shadow-glass',
          isUser
            ? 'bg-white/10 text-white'
            : 'border border-sky-400/15 bg-sky-500/10 text-[var(--fg)] backdrop-blur-xl',
        )}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        ) : (
          <div className="prose-chat text-sm">
            <MarkdownRenderer content={message.content} />
          </div>
        )}

        {!isUser && !isTyping ? (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute -bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-[var(--panel-border)] bg-[var(--panel-strong)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)] opacity-0 shadow-sm transition group-hover:opacity-100"
          >
            {copied ? (
              <HiCheck className="h-3.5 w-3.5 text-neon-cyan" />
            ) : (
              <HiClipboard className="h-3.5 w-3.5" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : null}
      </div>

      {isUser ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white">
          <HiUser className="h-4 w-4" />
        </div>
      ) : null}
    </div>
  )
}
