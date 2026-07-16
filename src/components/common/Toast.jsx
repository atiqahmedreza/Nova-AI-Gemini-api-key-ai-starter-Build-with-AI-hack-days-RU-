import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXMark,
} from 'react-icons/hi2'
import { cn } from '../../utils/cn'

const styles = {
  success: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100',
  error: 'border-rose-400/30 bg-rose-500/15 text-rose-100',
  warning: 'border-amber-400/30 bg-amber-500/15 text-amber-100',
  info: 'border-sky-400/30 bg-sky-500/15 text-sky-100',
}

const icons = {
  success: HiCheckCircle,
  error: HiExclamationCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
}

export default function Toast({ toast, onDismiss }) {
  const Icon = icons[toast.type] || HiInformationCircle

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-glass backdrop-blur-2xl animate-slide-up',
        styles[toast.type] || styles.info,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="rounded-lg p-1 opacity-80 transition hover:opacity-100"
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  )
}
