import { ReactNode, RefObject, useContext } from "react"
import { createPortal } from "react-dom"
import { CartContext } from "../../context/CartContext"
import useOutsideClick from "../../hooks/useOutsideClick"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
}

const Modal = ({ open, children, className = "" }: ModalProps) => {
  const { closeCart } = useContext(CartContext)

  const ref = useOutsideClick(closeCart) as RefObject<HTMLDialogElement>
  const modalRoot = document.getElementById("modal")
  if (!modalRoot) {
    return null
  }
  return createPortal(
    <dialog
      ref={ref}
      className={`${className}`}
      open={open}
      style={{ zIndex: "300" }}
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLDivElement
  )
}

export default Modal
