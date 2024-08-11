import { useContext } from "react"
import { CartContext, CartItemType } from "../../../context/CartContext"
import styles from "./CartItem.module.css"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { deleteCartItem, addCartItem } = useContext(CartContext)
  return (
    <div className={styles.cartItem}>
      <img src={`${item.image}`} alt={item.name} className={styles.img} />
      <h3>{item.name}</h3>
      <p>{item.quantity}</p>
      <button
        onClick={() => {
          deleteCartItem(item.id)
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          addCartItem(item)
        }}
      >
        +
      </button>
    </div>
  )
}

export default CartItem
