import { cn } from '../../utils/cn'

export default function TemplatePreview({ type = 'chat', tone = 'violet' }) {
  if (type === 'score') {
    return (
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-400/30">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 border-r-emerald-400 rotate-45" />
          <span className="font-display text-sm font-bold text-emerald-300">85</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-20 rounded-full bg-white/10">
            <div className="h-2 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>
          <div className="h-2 w-16 rounded-full bg-white/10">
            <div className="h-2 w-10 rounded-full bg-emerald-400/70" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'code') {
    return (
      <div className="rounded-xl bg-black/40 p-3 font-mono text-[10px] leading-relaxed text-orange-200/90">
        <div>
          <span className="text-fuchsia-300">function</span> sum(arr) {'{'}
        </div>
        <div className="pl-3 text-sky-300">return arr.reduce(...)</div>
        <div>{'}'}</div>
      </div>
    )
  }

  if (type === 'notes') {
    return (
      <div className="space-y-2 py-1">
        {['Concept', 'Analogy', 'Quiz'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <div
              className={cn(
                'h-2 rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-400/40',
                i === 0 ? 'w-24' : i === 1 ? 'w-20' : 'w-14',
              )}
            />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'interview') {
    return (
      <div className="space-y-2 py-1 text-[11px]">
        <div className="rounded-lg bg-sky-500/10 px-2 py-1.5 text-sky-200">Q: Tell me about a hard bug…</div>
        <div className="rounded-lg bg-white/5 px-2 py-1.5 text-white/60">A: Walking through tradeoffs…</div>
      </div>
    )
  }

  if (type === 'project') {
    return (
      <div className="grid grid-cols-3 gap-1.5 py-1">
        {['MVP', 'Stack', 'Plan'].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/10 px-2 py-3 text-center text-[10px] font-semibold text-fuchsia-200"
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2 py-1">
      <div className="ml-auto w-3/5 rounded-2xl bg-white/10 px-3 py-2 text-[10px] text-white/70">
        Help me ship faster
      </div>
      <div
        className={cn(
          'w-4/5 rounded-2xl border px-3 py-2 text-[10px] text-white/80',
          tone === 'violet'
            ? 'border-violet-400/20 bg-violet-500/10'
            : 'border-white/10 bg-white/5',
        )}
      >
        Let’s map your MVP in 3 steps…
      </div>
    </div>
  )
}
