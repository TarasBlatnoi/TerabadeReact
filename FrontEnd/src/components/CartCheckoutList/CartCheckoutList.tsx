import { useCart } from "../../context/CartContext"
import CartCheckoutItem from "./CartCheckoutItem/CartCheckoutItem"
import styles from "./CartCheckoutList.module.css"

function CartCheckoutList() {
  const { cartItems } = useCart()
  return (
    <ul className={styles.list}>
      {cartItems.map((item) => (
        <CartCheckoutItem item={item} />
      ))}
    </ul>
  )
}

export default CartCheckoutList
