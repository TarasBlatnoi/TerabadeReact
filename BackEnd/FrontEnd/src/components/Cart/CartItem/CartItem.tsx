import { useContext } from "react"
import { CartContext, CartItemType } from "../../../context/CartContext"
import styles from "./CartItem.module.css"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { deleteCartItem } = useContext(CartContext)
  return (
    <div className={styles.cartItem}>
      <img src={`${item.image}`} alt={item.name} className={styles.img} />
      <div className={styles.textWrapper}>
        <h3>{item.name}</h3>
        <p>
          Кількість: <span className={styles.priceNumber}>{item.quantity}</span>
        </p>
        <p>
          Ціна: <span className={styles.priceNumber}>{item.price}</span>
        </p>
      </div>
      <div
        className={styles.deleteItemCrossWrapper}
        onClick={() => deleteCartItem(item.id)}
      >
        <div className={styles.deleteItemCross}></div>
      </div>
    </div>
  )
}

export default CartItem
