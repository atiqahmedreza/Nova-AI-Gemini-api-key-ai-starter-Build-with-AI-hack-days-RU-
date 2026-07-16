import { HiSparkles } from 'react-icons/hi2'
import { FOOTER_POINTS } from '../../constants/templates'

export default function FooterStrip() {
  return (
    <footer className="mt-8 glass-panel flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between animate-fade-in">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {FOOTER_POINTS.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Icon className="h-4 w-4 text-neon-cyan" />
            <span className="font-medium text-white/80">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-btn-gradient text-white shadow-glow">
          <HiSparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="font-display text-sm font-semibold">Build Once. Use Forever.</p>
          <p className="text-[11px] text-[var(--muted)]">Your Ultimate AI Toolkit.</p>
        </div>
      </div>
    </footer>
  )
}
