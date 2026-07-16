import { QUICK_TEMPLATES, TONE_STYLES } from '../../constants/templates'
import { cn } from '../../utils/cn'

export default function RightRail({ onSelectTemplate, open, onClose }) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-surface-950/50 backdrop-blur-sm transition xl:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[18rem] flex-col gap-3 border-l border-[var(--panel-border)] bg-[var(--panel-strong)] p-4 backdrop-blur-2xl transition-transform duration-300 xl:static xl:z-0 xl:translate-x-0 xl:border-l xl:bg-transparent',
          open ? 'translate-x-0' : 'translate-x-full xl:translate-x-0',
        )}
      >
        <div className="glass-panel p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Quick Templates
          </p>
          <div className="space-y-1.5">
            {QUICK_TEMPLATES.map((item) => {
              const Icon = item.icon
              const tone = TONE_STYLES[item.tone]
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTemplate?.(item)
                    onClose?.()
                  }}
                  className="flex w-full items-start gap-3 rounded-xl border border-transparent px-2.5 py-2.5 text-left transition hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                      tone.chip,
                      tone.ring,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white/90">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="glass-panel p-4">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Usage Overview
          </p>
          <p className="mb-4 text-xs text-white/60">This Month</p>
          <UsageBar label="Messages" value="1,248 / 5,000" width="62%" />
          <UsageBar label="Tokens" value="2.4M / 10M" width="48%" className="mt-4" />
        </div>
      </aside>
    </>
  )
}

function UsageBar({ label, value, width, className }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-white/80">{label}</span>
        <span className="text-[var(--muted)]">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-bar-gradient transition-all duration-700" style={{ width }} />
      </div>
    </div>
  )
}
