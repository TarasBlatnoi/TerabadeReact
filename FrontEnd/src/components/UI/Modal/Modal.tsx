import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import useOutsideClick from "../../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
  closeModal: () => void
}

const Modal = ({ open, children, className = "", closeModal }: ModalProps) => {
  const [closedByUser, setCloseByUser] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  const ref = useOutsideClick(() => {
    setCloseByUser(true)
    closeModal()
  }) as RefObject<HTMLDialogElement>
  const wrapperRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById("modal")

  useEffect(() => {
    if (open) {
      setInternalOpen(true)
      const timeout = setTimeout(() => {
        wrapperRef?.current?.classList.add(styles.opening)
      })
      return () => clearTimeout(timeout)
    }
  }, [open])

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div
      className={`${styles.dialogWrapper} ${!open ? `${styles.closing}` : styles.visible} ${closedByUser ? styles.visible : ""}`}
      ref={wrapperRef}
      onTransitionEnd={() => {
        if (!open) {
          const dialogs = document.querySelectorAll(`.${styles.dialogWrapper}`)
          setInternalOpen(false)
          dialogs.forEach((dialog) => {
            dialog.classList.remove(styles.visible)
          })
        }
      }}
    >
      <dialog
        ref={ref}
        className={`${className}`}
        open={internalOpen}
        style={{ zIndex: "300" }}
      >
        {children}
      </dialog>
    </div>,
    modalRoot,
  )
}

export default Modal
