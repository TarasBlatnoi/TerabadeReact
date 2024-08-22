import { CartItemType } from "../../../../context/CartContext"
import { formaterCurrency } from "../../../CardItem/CardItem"
import styles from "./CheckoutItem.module.css"

function CheckoutItem({ item }: { item: CartItemType }) {
  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.firstContainer}>
          <h3 className={styles.name}>{item.name}</h3>
          <p>
            {formaterCurrency.format(item.price * item.quantity!)}{" "}
            <span>UAH</span>
          </p>
        </div>
        <div className={styles.secondContainer}>
          <div>
            <p>quantity</p>
            <span>{item.quantity}</span>
          </div>
          <div>
            <p>size</p>
            <span>{item.size}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CheckoutItem
