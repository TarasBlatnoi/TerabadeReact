import Button from "../UI/Button/Button"
import styles from "./CartCheckoutSummary.module.css"
import dropSVG from "../../assets/images/Vector.svg"
import { useEffect, useState } from "react"
import { formaterCurrency } from "../CardItem/CardItem"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateDiscount } from "../../store/Features/CheckoutSlice/CheckoutSlice"
import { storeType } from "../../store/store"

function CartCheckoutSummary() {
  const [openPromo, setOpenPromo] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const navigate = useNavigate()
  const [isAppliedCode, setIsAppliedCode] = useState(false)

  const { paymentDiscount: discount, paymentAmount: subTotal } = useSelector(
    (store: storeType) => store.checkout,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAppliedCode) dispatch(updateDiscount(500))
  }, [isAppliedCode])

  return (
    <form className={styles.container}>
      <div className={styles.cart}>
        <h1>Корзина</h1>
        <p className={styles.cartPriceTag}>
          {formaterCurrency.format(subTotal)} <span>UAH</span>
        </p>
      </div>
      <div
        className={`${styles.detailsContainer} ${openPromo ? styles.openDetailsContainer : ""}`}
      >
        <div className={styles.promoCode}>
          <div>
            <h1 className={styles.promo}>
              Промокод{" "}
              {isAppliedCode ? (
                <span className={styles.promoAppliedText}>(застосований)</span>
              ) : (
                ""
              )}
            </h1>
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
              <input
                type="text"
                minLength={8}
                maxLength={16}
                value={promoCode}
                onChange={(ev) => setPromoCode(ev.target.value)}
                placeholder="промокод"
                disabled={isAppliedCode}
              />
            </div>
            <div
              className={styles.addPromoContainer}
              onClick={() => {
                if (promoCode.length >= 8 && promoCode.length <= 16) {
                  setIsAppliedCode(true)
                  setOpenPromo(false)
                }
              }}
            >
              <p>Додати</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.priceaOfOrder} ${openPromo ? styles.open : ""}`}
        >
          <h2>Сума замовлення</h2>
        </div>
        <div
          className={`${styles.priceTagOrder} ${openPromo ? styles.open : ""}`}
        >
          <p>Вартість замовлення</p>
          <p className={styles.priceTagSubTotal}>
            {formaterCurrency.format(subTotal)} <span>UAH</span>
          </p>
        </div>
        <div className={`${styles.discount} ${openPromo ? styles.open : ""}`}>
          <p>Знижка</p>
          <p className={styles.priceTagDiscount}>
            -{discount} <span>UAH</span>
          </p>
        </div>
      </div>
      <div
        className={`${styles.finalContainer} ${openPromo ? styles.open : ""}`}
      >
        <div className={styles.finalPrice}>
          <h2>До сплати</h2>
          <p className={styles.finalPriceTag}>
            {formaterCurrency.format(subTotal - discount)} <span>UAH</span>
          </p>
        </div>
        <Button
          variant="secondary"
          className={styles.buttonOrder}
          onClick={(ev) => {
            ev.preventDefault()
            navigate("/checkout")
          }}
        >
          Оформити замовлення
        </Button>
      </div>
    </form>
  )
}

export default CartCheckoutSummary
