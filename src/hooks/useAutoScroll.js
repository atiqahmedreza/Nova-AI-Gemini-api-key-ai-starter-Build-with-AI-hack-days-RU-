import { useEffect, useRef } from 'react'

export function useAutoScroll(dependency) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [dependency])

  return bottomRef
}
