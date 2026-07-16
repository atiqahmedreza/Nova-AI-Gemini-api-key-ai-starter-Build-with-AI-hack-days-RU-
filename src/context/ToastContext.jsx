import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { createId } from '../utils/format'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    ({ type = 'info', message, duration = 3800 }) => {
      const id = createId('toast')
      setToasts((prev) => [...prev, { id, type, message }])

      if (duration > 0) {
        window.setTimeout(() => dismissToast(id), duration)
      }

      return id
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({ toasts, pushToast, dismissToast }),
    [toasts, pushToast, dismissToast],
  )

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
