import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import RightRail from '../components/layout/RightRail'
import { useChat } from '../hooks/useChat'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [railOpen, setRailOpen] = useState(false)
  const [queuedPrompt, setQueuedPrompt] = useState(null)
  const { activeSession, clearChat, newChat } = useChat()
  const canClear = Boolean(activeSession?.messages?.length)

  const handleNewChat = () => {
    newChat()
    setSidebarOpen(false)
  }

  const handleSelectTemplate = (template) => {
    if (template?.prompt) {
      setQueuedPrompt({ id: Date.now(), text: template.prompt })
    }
  }

  return (
    <div className="relative flex min-h-screen bg-page-glow soft-grid">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header
          onMenuOpen={() => setSidebarOpen(true)}
          onRailOpen={() => setRailOpen(true)}
          onNewChat={handleNewChat}
          onClearChat={clearChat}
          canClear={canClear}
        />
        <main className="flex min-h-0 flex-1">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <Outlet context={{ queuedPrompt, setQueuedPrompt }} />
          </div>
          <RightRail
            open={railOpen}
            onClose={() => setRailOpen(false)}
            onSelectTemplate={handleSelectTemplate}
          />
        </main>
      </div>
    </div>
  )
}
