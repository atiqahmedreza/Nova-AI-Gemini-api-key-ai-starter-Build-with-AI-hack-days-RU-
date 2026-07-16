import { HiSparkles } from 'react-icons/hi2'
import { APP_NAME } from '../../constants/appConfig'
import { STARTER_PROMPTS } from '../../constants/prompts'

export default function EmptyState({ onSelectPrompt }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-12 text-center animate-fade-in">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-btn-gradient text-white shadow-glow animate-float">
        <HiSparkles className="h-7 w-7" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight">
        How can {APP_NAME} help?
      </h2>
      <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
        Ask anything, or launch a starter prompt. Use Quick Templates on the right
        to specialize instantly.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {STARTER_PROMPTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectPrompt(item.prompt)}
            className="glass-panel px-4 py-4 text-left hover-lift"
          >
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
