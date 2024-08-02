import { useContext } from "react"
import Modal from "../UI/Modal/Modal"
import { CartContext } from "../../context/CartContext"
import styles from "./Cart.module.css"
import CartItem from "./CartItem/CartItem"
const Cart = () => {
  const { isOpened, closeCart, cartItems, resetCartItems } =
    useContext(CartContext)
  return (
    <Modal open={isOpened} className={styles.cart}>
      {cartItems.map((cartItem) => {
        return <CartItem item={cartItem} key={cartItem.id} />
      })}
      <button onClick={closeCart}>Close cart</button>
      <button onClick={resetCartItems}>Clear All</button>
    </Modal>
  )
}

export default Cart
