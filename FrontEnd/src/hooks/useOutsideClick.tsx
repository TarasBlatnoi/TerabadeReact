import { useEffect, useRef } from "react"

const useOutsideClick = (handler: () => void, listenCapturing = true) => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement
      if (!ref.current?.contains(target)) {
        console.log("outside click")
        handler()
      }
    }
    document.addEventListener("click", handleClick, listenCapturing)
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing)
    }
  }, [handler, listenCapturing])
  return ref
}

export default useOutsideClick
