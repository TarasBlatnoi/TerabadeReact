import { Link } from "react-router-dom"
import { useCart } from "../../../context/CartContext"
import CheckoutItem from "./CheckoutItem/CheckoutItem"
import styles from "./CheckoutItemList.module.css"

function CheckoutItemList() {
  const { cartItems } = useCart()

  return (
    <ul className={styles.list}>
      <div className={styles.editContainer}>
        <h1>In Your Bag</h1>
        <Link to={"/cart"} className={styles.link}>
          Edit
        </Link>
      </div>
      <div className={styles.amount}>
        <p>{cartItems.length} items</p>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem item={item} />
      ))}
    </ul>
  )
}

export default CheckoutItemList
