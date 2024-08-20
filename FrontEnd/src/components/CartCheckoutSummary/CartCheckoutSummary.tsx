import Button from "../UI/Button/Button"
import styles from "./CartCheckoutSummary.module.css"

function CartCheckoutSummary() {
  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <h1>Корзина</h1>
        <p>
          4 799 <span>UAH</span>
        </p>
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.promo}>Промокод</h1>
        <div className={styles.priceOfOrder}>
          <h2>Сума замовлення</h2>
        </div>
        <div className={styles.priceTagOrder}>
          <p>Вартість замовлення</p>
          <p>
            4 799 <span>UAH</span>
          </p>
        </div>
        <div className={styles.discount}>
          <p>Знижка по переоцінці</p>
          <p>
            -200 <span>UAH</span>
          </p>
        </div>
      </div>
      <div className={styles.finalContainer}>
        <div className={styles.finalPrice}>
          <h2>До сплати</h2>
          <p className={styles.finalPriceTag}>
            4 799 <span>UAH</span>
          </p>
        </div>
        <Button variant="secondary" className={styles.buttonOrder}>
          Оформити замовлення
        </Button>
      </div>
    </div>
  )
}

export default CartCheckoutSummary
