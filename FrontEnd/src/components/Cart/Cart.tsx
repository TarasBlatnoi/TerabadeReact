import { useContext } from "react"
import Modal from "../UI/Modal"
import { CartContext } from "../../context/CartContext"
import styles from "./Cart.module.css"
import CartItem from "./CartItem/CartItem"
const Cart = () => {
  const { isOpened, toggleCart, cartItems } = useContext(CartContext)
  return (
    <Modal open={isOpened} className={styles.cart}>
      {cartItems.map((cartItem) => {
        return <CartItem item={cartItem} key={cartItem.id} />
      })}
      <button onClick={toggleCart}>Close cart</button>
    </Modal>
  )
}

export default Cart
