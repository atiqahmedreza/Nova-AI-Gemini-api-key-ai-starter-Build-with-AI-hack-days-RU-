import { HiCheckCircle, HiSparkles } from 'react-icons/hi2'
import { APP_NAME } from '../../constants/appConfig'
import { LANDING_PERKS } from '../../constants/templates'
import ThemeToggle from '../common/ThemeToggle'

export default function HeroPanel() {
  return (
    <aside className="flex h-full flex-col justify-between p-6 md:p-7 animate-slide-in">
      <div>
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-btn-gradient text-white shadow-glow">
              <HiSparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-[0.14em] text-white/90">
                AI STARTER TEMPLATE
              </p>
              <p className="text-xs text-[var(--muted)]">{APP_NAME}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-[2.65rem]">
          One Template.
          <br />
          <span className="gradient-text">Unlimited Possibilities.</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
          A Dribbble-quality Gemini foundation. Swap prompts and UI to ship
          chatbots, coaches, analyzers, and advisors in hours.
        </p>

        <ul className="mt-7 space-y-3">
          {LANDING_PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-sm text-white/85">
              <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-neon-cyan" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-panel mt-8 p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Built With
        </p>
        <div className="grid grid-cols-2 gap-2">
          {['React', 'Vite', 'Tailwind CSS', 'Gemini API'].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
