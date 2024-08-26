import { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import useOutsideClick from "../../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
  closeModal: () => void
  dialogFirst?: boolean
  addTransition?: string
  openImmidiately?: boolean
}

const Modal = ({
  open,
  children,
  addTransition,
  className = "",
  closeModal,
  dialogFirst,
  openImmidiately,
}: ModalProps) => {
  const [closedByUser, setCloseByUser] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  const ref = useOutsideClick(() => {
    if (dialogFirst) {
      setInternalOpen(false)
    }
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
  }, [open, setInternalOpen, addTransition, ref])

  if (!modalRoot) {
    return null
  }
  console.log(
    `${className} ${addTransition && internalOpen ? addTransition : ""}`,
  )
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
        className={`${className} ${addTransition && internalOpen ? addTransition : ""}`}
        open={openImmidiately ? open : internalOpen}
        style={{ zIndex: "300" }}
      >
        {children}
      </dialog>
    </div>,
    modalRoot,
  )
}

export default Modal
