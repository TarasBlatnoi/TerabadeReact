import { CartItemType, useCart } from "../../../context/CartContext"
import FavoriteButtons from "../../../pages/DetailProduct/FavoriteButtons/FavoriteButtons"
import styles from "./CartCheckoutItem.module.css"
import deleteBag from "../../../assets/images/DeleteBag.png"
import { formaterCurrency } from "../../CardItem/CardItem"

interface CartCheckoutItemProps {
  item: CartItemType
}

function CartCheckoutItem({ item }: CartCheckoutItemProps) {
  const { removeItem, setItemQuantity } = useCart()

  const maxItemQuantityPerOrder = 10
  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.details}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.price}>
            <h2 className={styles.priceTag}>
              {formaterCurrency.format(item.price * (item.quantity || 1))}
              <span className={styles.currency}> UAH</span>
            </h2>
          </div>
        </div>
        <div className={styles.anotherContainer}>
          <div className={styles.typeSizeContainer}>
            <p className={styles.description}>
              {`${item.sex}\`s ${item.type}`} shoes
            </p>
            <div className={styles.sizeSelectContainer}>
              <p className={styles.size}>
                Розмір: <span className={styles.sizeSpan}>{item.size}</span>
              </p>
              <p>Кількість</p>
              <select
                className={styles.selection}
                value={item.quantity}
                onChange={(ev) => setItemQuantity(item.id, +ev.target.value)}
              >
                {Array.from(
                  { length: maxItemQuantityPerOrder },
                  (_, i) => i + 1,
                ).map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.actionsContainer}>
            <FavoriteButtons
              ProductID={+item.id}
              className={styles.favButton}
              height="3rem"
              fill="red"
            />
            <div
              className={styles.deleteBagContainer}
              onClick={() => {
                console.log("deleting")
                removeItem(item.id)
              }}
            >
              <img src={deleteBag} alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartCheckoutItem
