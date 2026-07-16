import { Link } from 'react-router-dom'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboard,
  HiOutlinePlus,
  HiOutlineRectangleStack,
  HiOutlineStar,
  HiOutlineTrash,
  HiPaperAirplane,
  HiSparkles,
} from 'react-icons/hi2'
import ThemeToggle from '../common/ThemeToggle'
import { QUICK_TEMPLATES } from '../../constants/templates'
import { TONE_STYLES } from '../../constants/templates'
import { cn } from '../../utils/cn'

const recent = [
  { title: 'Quantum Computing Basics', time: '10:30 AM' },
  { title: 'Resume bullet rewrite', time: 'Yesterday' },
  { title: 'Mock interview round', time: 'Mon' },
]

export default function StudioPreview() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-3 shadow-card animate-slide-up md:p-4">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />

      <div className="relative grid min-h-[520px] gap-3 lg:grid-cols-[210px_minmax(0,1fr)_200px]">
        {/* Inner left nav */}
        <div className="rounded-2xl border border-white/8 bg-black/25 p-3">
          <Link to="/chat" className="btn-primary mb-4 w-full !rounded-xl !py-2.5 text-xs">
            <HiOutlinePlus className="h-4 w-4" />
            New Chat
          </Link>

          <nav className="space-y-1 text-sm">
            {[
              { label: 'Chat', icon: HiOutlineChatBubbleLeftRight, active: true },
              { label: 'Templates', icon: HiOutlineRectangleStack },
              { label: 'History', icon: HiOutlineClipboard },
            ].map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-xs',
                  active
                    ? 'bg-violet-500/15 text-white'
                    : 'text-[var(--muted)] hover:bg-white/5',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </nav>

          <p className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Recent Chats
          </p>
          <div className="space-y-1.5">
            {recent.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-transparent px-2.5 py-2 hover:border-white/10 hover:bg-white/[0.03]"
              >
                <p className="truncate text-xs font-medium text-white/85">{item.title}</p>
                <p className="text-[10px] text-[var(--muted)]">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat stage */}
        <div className="flex min-h-[420px] flex-col rounded-2xl border border-white/8 bg-black/20">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-btn-gradient text-white shadow-glow">
                <HiSparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">AI Chatbot</p>
                <p className="text-[10px] text-emerald-300">Online · Gemini</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)]">
                <HiOutlineClipboard className="h-4 w-4" />
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)]">
                <HiOutlineTrash className="h-4 w-4" />
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)]">
                <HiOutlineStar className="h-4 w-4" />
              </span>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-hidden px-4 py-4">
            <div className="ml-auto max-w-[80%] rounded-2xl bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-white/90">
              Explain quantum computing like I’m new to the field.
            </div>
            <div className="max-w-[92%] rounded-2xl border border-sky-400/15 bg-sky-500/10 px-3.5 py-3 text-xs leading-relaxed text-white/90">
              <p className="mb-2 font-semibold text-sky-200">Key Concepts</p>
              <ul className="list-disc space-y-1 pl-4 text-[var(--muted)]">
                <li>Bits become qubits that can hold more states</li>
                <li>Superposition unlocks parallel exploration</li>
                <li>Useful for search, crypto, and simulation</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 p-3">
            <div className="glass-input flex items-center gap-2 px-3 py-2">
              <input
                readOnly
                value=""
                placeholder="Type your message..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-[var(--muted)]"
              />
              <Link
                to="/chat"
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-btn-gradient px-3 text-xs font-semibold text-white shadow-glow"
              >
                Send
                <HiPaperAirplane className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right rail preview */}
        <div className="hidden flex-col gap-3 lg:flex">
          <div className="rounded-2xl border border-white/8 bg-black/25 p-3">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Quick Templates
            </p>
            <div className="space-y-2">
              {QUICK_TEMPLATES.slice(0, 4).map((item) => {
                const Icon = item.icon
                const tone = TONE_STYLES[item.tone]
                return (
                  <Link
                    key={item.id}
                    to="/chat"
                    state={{ templateId: item.id, prompt: item.prompt }}
                    className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-2 transition hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-lg border',
                        tone.chip,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[11px] font-medium text-white/85">{item.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/25 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Usage Overview
            </p>
            <p className="mb-3 text-[11px] text-white/60">This Month</p>
            <UsageBar label="Messages" value="1,248 / 5,000" width="62%" />
            <UsageBar label="Tokens" value="2.4M / 10M" width="48%" className="mt-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function UsageBar({ label, value, width, className }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between text-[10px]">
        <span className="text-white/75">{label}</span>
        <span className="text-[var(--muted)]">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-bar-gradient" style={{ width }} />
      </div>
    </div>
  )
}
