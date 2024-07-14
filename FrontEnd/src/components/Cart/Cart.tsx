import { useContext } from "react"
import Modal from "../UI/Modal"
import { CartContext } from "../../context/CartContext"
import styles from "./Cart.module.css"
const Cart = () => {
  const { isOpened, toggleCart } = useContext(CartContext)
  return (
    <Modal open={isOpened} className={styles.cart}>
      <button onClick={toggleCart}>Close cart</button>
    </Modal>
  )
}

export default Cart
