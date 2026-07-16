import { useEffect, useRef, useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi2'
import Spinner from '../common/Spinner'
import { cn } from '../../utils/cn'

export default function ChatInput({ onSend, isSending, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }, [value])

  const submit = () => {
    if (isSending || disabled) return
    const next = value
    setValue('')
    onSend(next)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-[var(--panel-border)] bg-[var(--bg)]/55 px-4 py-4 backdrop-blur-2xl md:px-6">
      <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
        <div className="glass-input relative flex-1 px-4 py-3 shadow-glass">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type your message..."
            disabled={disabled || isSending}
            className="max-h-[180px] min-h-[28px] w-full resize-none bg-transparent text-sm leading-relaxed text-[var(--fg)] outline-none placeholder:text-[var(--muted)] disabled:opacity-60"
          />
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={disabled || isSending || !value.trim()}
          className={cn(
            'inline-flex h-12 items-center gap-2 rounded-xl bg-btn-gradient px-4 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          aria-label="Send message"
        >
          {isSending ? (
            <Spinner size="sm" className="border-white border-r-transparent" />
          ) : (
            <>
              <span className="hidden sm:inline">Send</span>
              <HiPaperAirplane className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-[var(--muted)]">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
