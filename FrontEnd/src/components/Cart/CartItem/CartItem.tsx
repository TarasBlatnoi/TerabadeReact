import { CartItemType } from "../../../context/CartContext"
import styles from "./CartItem.module.css"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={`${item.image}`} alt={item.name} className={styles.img} />
      </div>
      <div className={styles.textWrapper}>
        <h3>{item.name}</h3>
        <p>
          Кількість: <span className={styles.priceNumber}>{item.quantity}</span>
        </p>
        <p>
          Ціна: <span className={styles.priceNumber}>{item.price}</span>
        </p>
      </div>
    </div>
  )
}

export default CartItem
