import Button from "../UI/Button/Button"
import styles from "./CartCheckoutSummary.module.css"
import dropSVG from "../../assets/images/Vector.svg"
import { useState } from "react"

function CartCheckoutSummary() {
  const [openPromo, setOpenPromo] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <h1>Корзина</h1>
        <p>
          4 799 <span>UAH</span>
        </p>
      </div>
      <div
        className={`${styles.detailsContainer} ${openPromo ? styles.openDetailsContainer : ""}`}
      >
        <div className={styles.promoCode}>
          <div>
            <h1 className={styles.promo}>Промокод</h1>
            <div
              className={`${styles.svgContainer} ${openPromo ? styles.openContainer : ""}`}
              onClick={() => setOpenPromo((curr) => !curr)}
            >
              <img src={dropSVG} alt="Показати" />
            </div>
          </div>

          <div
            className={`${styles.promoContainer} ${openPromo ? styles.openInputContainer : ""}`}
          >
            <div className={styles.inputContainerP}>
              <input type="text" maxLength={16} placeholder="промокод" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.priceOfOrder} ${openPromo ? styles.open : ""}`}
        >
          <h2>Сума замовлення</h2>
        </div>
        <div
          className={`${styles.priceTagOrder} ${openPromo ? styles.open : ""}`}
        >
          <p>Вартість замовлення</p>
          <p>
            4 799 <span>UAH</span>
          </p>
        </div>
        <div className={`${styles.discount} ${openPromo ? styles.open : ""}`}>
          <p>Знижка по переоцінці</p>
          <p>
            -200 <span>UAH</span>
          </p>
        </div>
      </div>
      <div
        className={`${styles.finalContainer} ${openPromo ? styles.open : ""}`}
      >
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
