import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import useOutsideClick from "../../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
  closeModal: () => void
  addTransition?: string
}

const Modal = ({
  open,
  children,
  addTransition,
  className = "",
  closeModal,
}: ModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const ref = useOutsideClick(() => {
    setInternalOpen(false)
    closeModal()
  }) as RefObject<HTMLDialogElement>
  const wrapperRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById("modal")
  useEffect(() => {
    if (open) {
      setInternalOpen(true)
    }
  }, [open])

  if (!modalRoot) {
    return null
  }

  if (!open) {
    return null
  }

  return createPortal(
    <div
      className={`${styles.dialogWrapper} ${open && styles.visible} ${internalOpen && styles.visible} ${internalOpen && styles.opening}`}
      ref={wrapperRef}
    >
      <dialog
        ref={ref}
        className={`${className} ${addTransition && internalOpen ? addTransition : ""}`}
        open={open}
        style={{ zIndex: "300" }}
      >
        {children}
      </dialog>
    </div>,
    modalRoot,
  )
}

export default Modal
