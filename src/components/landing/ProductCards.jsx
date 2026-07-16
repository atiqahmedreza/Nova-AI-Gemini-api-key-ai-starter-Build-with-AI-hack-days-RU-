import { Link } from 'react-router-dom'
import { PRODUCT_CARDS, TONE_STYLES } from '../../constants/templates'
import { cn } from '../../utils/cn'
import TemplatePreview from './TemplatePreview'

export default function ProductCards() {
  return (
    <section className="mt-8 animate-fade-in">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Transform Into Multiple AI Applications
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            One architecture. Swap prompts and launch a new product surface.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {PRODUCT_CARDS.map((card, index) => {
          const Icon = card.icon
          const tone = TONE_STYLES[card.tone] || TONE_STYLES.violet

          return (
            <article
              key={card.id}
              className="glass-panel group flex flex-col p-4 hover-lift"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-xl border',
                    tone.chip,
                    tone.ring,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-display text-sm font-semibold">{card.title}</h3>
              </div>

              <div className="mb-3 min-h-[72px] rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                <TemplatePreview type={card.preview} tone={card.tone} />
              </div>

              <p className="mb-4 flex-1 text-xs leading-relaxed text-[var(--muted)]">
                {card.description}
              </p>

              <Link
                to="/chat"
                state={{ templateId: card.id }}
                className={cn(
                  'inline-flex items-center justify-center rounded-xl bg-gradient-to-r px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110',
                  tone.btn,
                )}
              >
                {card.cta}
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
