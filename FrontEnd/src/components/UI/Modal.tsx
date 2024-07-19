import { ReactNode, useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CartContext } from "../../context/CartContext"

interface ModalProps {
  open: boolean
  children: ReactNode
  className: string
}

const Modal = ({ open, children, className = "" }: ModalProps) => {
  const { closeCart } = useContext(CartContext)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    function closeDialog(e: Event) {
      const target = e.target as HTMLElement
      console.log(dialog.current?.contains(target))
      if (!dialog.current?.contains(target)) {
        console.log("outside click")
        closeCart()
      }
    }
    document.addEventListener("click", closeDialog, true)
    return () => {
      document.removeEventListener("click", closeDialog, true)
    }
  }, [closeCart])
  const modalRoot = document.getElementById("modal")
  if (!modalRoot) {
    return null
  }
  return createPortal(
    <dialog
      ref={dialog}
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
