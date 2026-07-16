import { cn } from '../../utils/cn'

export default function IconButton({
  children,
  className,
  label,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--muted)] transition duration-200 hover:border-[var(--panel-border)] hover:bg-white/5 hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
