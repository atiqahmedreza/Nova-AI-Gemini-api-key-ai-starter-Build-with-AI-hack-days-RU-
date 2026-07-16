export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1" aria-label="AI is typing">
      <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-dot" />
      <span
        className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-dot"
        style={{ animationDelay: '0.15s' }}
      />
      <span
        className="h-2 w-2 rounded-full bg-neon-magenta animate-pulse-dot"
        style={{ animationDelay: '0.3s' }}
      />
    </div>
  )
}
