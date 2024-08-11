import { ReactNode, RefObject, useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CartContext } from "../../../context/CartContext"
import useOutsideClick from "../../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
}

const Modal = ({ open, children, className = "" }: ModalProps) => {
  const { closeCart } = useContext(CartContext)

  const ref = useOutsideClick(closeCart) as RefObject<HTMLDialogElement>
  const wrapperRef = useRef<HTMLDivElement>(null)
  const modalRoot = document.getElementById("modal")

  if (!modalRoot) {
    return null
  }

  if (!open) {
    return null
  }

  return createPortal(
    <div className={styles.dialogWrapper} ref={wrapperRef}>
      <dialog
        ref={ref}
        className={`${className}`}
        open={open}
        style={{ zIndex: "300" }}
      >
        {children}
      </dialog>
    </div>,
    modalRoot
  )
}

export default Modal
