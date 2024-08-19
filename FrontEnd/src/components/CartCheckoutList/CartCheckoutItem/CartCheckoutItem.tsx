import { CartItemType } from "../../../context/CartContext"
import FavoriteButtons from "../../../pages/DetailProduct/FavoriteButtons/FavoriteButtons"
import styles from "./CartCheckoutItem.module.css"

interface CartCheckoutItemProps {
  item: CartItemType
}

function CartCheckoutItem({ item }: CartCheckoutItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.details}>
        <div>
          <h2>{item.name}</h2>
          <FavoriteButtons ProductID={+item.id} />
        </div>
        <p>{`${item.sex}\`s ${item.type}`} shoes</p>
        <p>
          Розмір: <span>{item.quantity}</span>
        </p>
      </div>
    </li>
  )
}

export default CartCheckoutItem
