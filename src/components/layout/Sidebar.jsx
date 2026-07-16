import {
  HiChatBubbleLeftRight,
  HiOutlineClipboard,
  HiOutlineRectangleStack,
  HiPlus,
  HiTrash,
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { APP_NAME } from '../../constants/appConfig'
import { useChatContext } from '../../context/ChatContext'
import { formatRelativeTime } from '../../utils/format'
import { cn } from '../../utils/cn'
import Button from '../common/Button'
import IconButton from '../common/IconButton'

export default function Sidebar({ open, onClose, onNewChat }) {
  const { sessions, activeSessionId, selectSession, deleteSession } =
    useChatContext()

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-surface-950/60 backdrop-blur-sm transition lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-[var(--panel-border)] bg-[var(--panel-strong)] p-4 backdrop-blur-2xl transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-btn-gradient text-white shadow-glow">
              <HiChatBubbleLeftRight className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold tracking-tight">{APP_NAME}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                Studio
              </p>
            </div>
          </Link>
        </div>

        <Button onClick={onNewChat} className="mb-4 w-full !rounded-xl">
          <HiPlus className="h-4 w-4" />
          New Chat
        </Button>

        <nav className="mb-4 space-y-1">
          {[
            { label: 'Chat', icon: HiChatBubbleLeftRight, active: true },
            { label: 'Templates', icon: HiOutlineRectangleStack },
            { label: 'History', icon: HiOutlineClipboard },
          ].map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm',
                active
                  ? 'bg-violet-500/15 text-white'
                  : 'text-[var(--muted)]',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </nav>

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Recent Chats
        </p>

        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
          {sessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-[var(--muted)]">
              No chats yet. Start a conversation to build history.
            </div>
          ) : (
            sessions.map((session) => {
              const active = session.id === activeSessionId
              return (
                <div
                  key={session.id}
                  className={cn(
                    'group flex items-center gap-1 rounded-xl border px-1.5 py-1.5 transition',
                    active
                      ? 'border-violet-400/25 bg-violet-500/10'
                      : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      selectSession(session.id)
                      onClose?.()
                    }}
                    className="min-w-0 flex-1 px-2 py-1 text-left"
                  >
                    <p className="truncate text-sm font-medium">{session.title}</p>
                    <p className="truncate text-[11px] text-[var(--muted)]">
                      {formatRelativeTime(session.updatedAt)}
                    </p>
                  </button>
                  <IconButton
                    label="Delete conversation"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    onClick={() => deleteSession(session.id)}
                  >
                    <HiTrash className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              )
            })
          )}
        </div>
      </aside>
    </>
  )
}
