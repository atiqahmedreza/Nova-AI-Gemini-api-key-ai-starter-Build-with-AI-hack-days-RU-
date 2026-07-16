import MessageBubble from './MessageBubble'
import EmptyState from './EmptyState'
import { useAutoScroll } from '../../hooks/useAutoScroll'

export default function MessageList({ messages, isSending, onSelectPrompt }) {
  const bottomRef = useAutoScroll(
    `${messages.length}-${isSending ? 'typing' : 'idle'}`,
  )

  if (!messages.length && !isSending) {
    return <EmptyState onSelectPrompt={onSelectPrompt} />
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 md:px-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isSending ? (
        <MessageBubble
          isTyping
          message={{ id: 'typing', role: 'assistant', content: '' }}
        />
      ) : null}

      <div ref={bottomRef} />
    </div>
  )
}
