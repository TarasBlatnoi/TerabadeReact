import { useCart } from "../../../context/CartContext"
import CheckoutItem from "./CheckoutItem/CheckoutItem"
import styles from "./CheckoutItemList.module.css"

function CheckoutItemList() {
  const { cartItems } = useCart()

  return (
    <ul className={styles.list}>
      {cartItems.map((item) => (
        <CheckoutItem item={item} />
      ))}
    </ul>
  )
}

export default CheckoutItemList
