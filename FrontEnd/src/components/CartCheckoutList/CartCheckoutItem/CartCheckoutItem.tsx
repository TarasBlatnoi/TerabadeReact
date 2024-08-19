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
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{item.name}</h1>
          <FavoriteButtons
            ProductID={+item.id}
            className={styles.favButton}
            height="3rem"
          />
        </div>
        <div className={styles.typeSizeContainer}>
          <p className={styles.description}>
            {`${item.sex}\`s ${item.type}`} shoes
          </p>
          <p className={styles.size}>
            Розмір: <span>{item.size}</span>
          </p>
        </div>
      </div>
    </li>
  )
}

export default CartCheckoutItem
