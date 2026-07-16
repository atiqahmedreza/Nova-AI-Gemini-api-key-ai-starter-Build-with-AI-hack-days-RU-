import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

export default function ErrorBanner({ message, onDismiss, className }) {
  if (!message) return null

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 animate-fade-in backdrop-blur-xl',
        className,
      )}
    >
      <HiExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="rounded-lg p-1 transition hover:bg-rose-500/20"
        >
          <HiXMark className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  )
}
