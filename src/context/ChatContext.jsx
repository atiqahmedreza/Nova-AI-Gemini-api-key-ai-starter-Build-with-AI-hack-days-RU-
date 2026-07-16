import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { createId, titleFromMessage } from '../utils/format'

const ChatContext = createContext(null)

function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadActiveId(sessions) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION)
    if (!raw) return sessions[0]?.id || null
    const id = JSON.parse(raw)
    return sessions.some((s) => s.id === id) ? id : sessions[0]?.id || null
  } catch {
    return sessions[0]?.id || null
  }
}

function createEmptySession() {
  const now = new Date().toISOString()
  return {
    id: createId('session'),
    title: 'New chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState(() => loadSessions())
  const [activeSessionId, setActiveSessionId] = useState(() =>
    loadActiveId(loadSessions()),
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
    } catch {
      // ignore
    }
  }, [sessions])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_SESSION,
        JSON.stringify(activeSessionId),
      )
    } catch {
      // ignore
    }
  }, [activeSessionId])

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) || null,
    [sessions, activeSessionId],
  )

  const createSession = useCallback(() => {
    const session = createEmptySession()
    setSessions((prev) => [session, ...prev])
    setActiveSessionId(session.id)
    return session
  }, [])

  const ensureActiveSession = useCallback(() => {
    if (activeSession) return activeSession
    return createSession()
  }, [activeSession, createSession])

  const selectSession = useCallback((id) => {
    setActiveSessionId(id)
  }, [])

  const deleteSession = useCallback(
    (id) => {
      setSessions((prev) => {
        const next = prev.filter((session) => session.id !== id)
        if (activeSessionId === id) {
          setActiveSessionId(next[0]?.id || null)
        }
        return next
      })
    },
    [activeSessionId],
  )

  const appendMessage = useCallback((sessionId, message) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session

        const messages = [...session.messages, message]
        const shouldTitle =
          session.title === 'New chat' && message.role === 'user'

        return {
          ...session,
          messages,
          title: shouldTitle ? titleFromMessage(message.content) : session.title,
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }, [])

  const clearActiveMessages = useCallback(() => {
    if (!activeSessionId) return
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [],
              title: 'New chat',
              updatedAt: new Date().toISOString(),
            }
          : session,
      ),
    )
  }, [activeSessionId])

  const value = useMemo(
    () => ({
      sessions,
      activeSessionId,
      activeSession,
      createSession,
      ensureActiveSession,
      selectSession,
      deleteSession,
      appendMessage,
      clearActiveMessages,
    }),
    [
      sessions,
      activeSessionId,
      activeSession,
      createSession,
      ensureActiveSession,
      selectSession,
      deleteSession,
      appendMessage,
      clearActiveMessages,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}
