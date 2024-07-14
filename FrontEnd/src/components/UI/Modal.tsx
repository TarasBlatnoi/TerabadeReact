import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
}

const Modal = ({ open, children, className = "" }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [open])
  const modalRoot = document.getElementById("modal")
  if (!modalRoot) {
    return null
  }
  return createPortal(
    <dialog ref={dialog} className={`${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLDivElement
  )
}

export default Modal
