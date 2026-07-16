import {
  HiBars3,
  HiOutlineRectangleGroup,
  HiPlus,
  HiSparkles,
  HiTrash,
} from 'react-icons/hi2'
import ThemeToggle from '../common/ThemeToggle'
import IconButton from '../common/IconButton'
import Button from '../common/Button'

export default function Header({
  onMenuOpen,
  onRailOpen,
  onNewChat,
  onClearChat,
  canClear,
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--panel-border)] bg-[var(--bg)]/70 px-4 py-3 backdrop-blur-2xl md:px-5">
      <div className="flex items-center gap-3">
        <IconButton label="Open sidebar" className="lg:hidden" onClick={onMenuOpen}>
          <HiBars3 className="h-5 w-5" />
        </IconButton>

        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-btn-gradient text-white shadow-glow">
            <HiSparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold">AI Chatbot</p>
            <p className="text-[11px] text-emerald-300">Online · Gemini powered</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <IconButton
          label="Open templates"
          className="xl:hidden"
          onClick={onRailOpen}
        >
          <HiOutlineRectangleGroup className="h-5 w-5" />
        </IconButton>
        <IconButton label="Clear chat" onClick={onClearChat} disabled={!canClear}>
          <HiTrash className="h-4 w-4" />
        </IconButton>
        <Button onClick={onNewChat} className="!rounded-xl !px-3 !py-2">
          <HiPlus className="h-4 w-4" />
          <span className="hidden sm:inline">New Chat</span>
        </Button>
      </div>
    </header>
  )
}
