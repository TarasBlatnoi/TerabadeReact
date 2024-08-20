import { CartItemType, useCart } from "../../../context/CartContext"
import FavoriteButtons from "../../../pages/DetailProduct/FavoriteButtons/FavoriteButtons"
import styles from "./CartCheckoutItem.module.css"
import deleteBag from "../../../assets/images/DeleteBag.png"

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
          <FavoriteButtons
            ProductID={+item.id}
            className={styles.favButton}
            height="3rem"
          />
        </div>
        <div className={styles.anotherContainer}>
          <div className={styles.typeSizeContainer}>
            <p className={styles.description}>
              {`${item.sex}\`s ${item.type}`} shoes
            </p>
            <p className={styles.size}>
              Розмір: <span>{item.size}</span>
            </p>
          </div>
          <div className={styles.quantityContainer}>
            <div className={styles.sizeSelectContainer}>
              <p>Кількість</p>
              <select
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
