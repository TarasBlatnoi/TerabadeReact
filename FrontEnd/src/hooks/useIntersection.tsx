import React, { useCallback, useRef } from "react"

type useIntersectionParams = {
  isLoading: boolean
  hasMore: boolean
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export function useIntersection({
  isLoading,
  hasMore,
  setPageNumber,
}: useIntersectionParams) {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastProductElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prev) => prev + 1)
          }
        },
        { rootMargin: "50%" },
      )

      if (node) observer.current.observe(node)
    },
    [hasMore, isLoading, setPageNumber],
  )

  return { lastProductElementRef }
}
