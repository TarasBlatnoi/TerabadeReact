import { ReactNode, useEffect, useState } from "react"

interface Props {
  src: string
  fallback?: ReactNode
  className?: string
  alt: string
  height: string
}

const ImageStateful = ({
  alt,
  className,
  src,
  height,
  fallback = <p>Failed to load</p>,
  ...props
}: Props) => {
  const [state, setState] = useState("loading")
  useEffect(() => {
    const img = new Image()
    img.onload = () => setState("success")
    img.onerror = () => setState("error")
    img.src = src
  }, [])

  return (
    <>
      {state === "loading" && (
        <div
          style={{
            height: `${height}`,
            width: "100%",
            background: "none",
          }}
        ></div>
      )}
      {state === "error" && fallback}
      {state === "success" && (
        <img src={src} {...props} className={className} alt={alt} />
      )}
    </>
  )
}

export default ImageStateful
