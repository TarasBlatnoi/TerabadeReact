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

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (!open && wrapperRef.current) {
        wrapperRef.current.classList.add(styles.hidden)
      }
    }

    const wrapperElement = wrapperRef.current
    if (wrapperElement) {
      wrapperElement.addEventListener("transitionend", handleTransitionEnd, {
        once: true,
      })
    }

    return () => {
      if (wrapperElement) {
        wrapperElement.removeEventListener("transitionend", handleTransitionEnd)
      }
    }
  }, [open])

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div
      className={`${styles.dialogWrapper} ${
        open ? styles.opened : styles.closed
      }`}
      ref={wrapperRef}
    >
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
