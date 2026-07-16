import { useToast } from '../../context/ToastContext'
import Toast from './Toast'

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(100vw-2rem,24rem)] flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
}
