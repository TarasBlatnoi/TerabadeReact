import { useNavigate } from "react-router-dom"
import CartCheckoutList from "../../components/CartCheckoutList/CartCheckoutList"
import CartCheckoutSummary from "../../components/CartCheckoutSummary/CartCheckoutSummary"
import Button from "../../components/UI/Button/Button"
import { useCart } from "../../context/CartContext"
import styles from "./Cart.module.css"

function Cart() {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  return (
    <div
      className={`${styles.container} ${!cartItems.length ? styles.defaultMessage : ""}`}
    >
      {cartItems.length ? (
        <>
          <section className={styles.leftContainer}>
            <CartCheckoutList />
          </section>
          <section className={styles.rightContainer}>
            <CartCheckoutSummary />
          </section>
        </>
      ) : (
        <>
          <h1 className={styles.favProductsFallback}>
            Упс, у вашому кошику поки що порожньо. Додайте взуття, яке вам
            подобається!
          </h1>

          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate("/sale")}
          >
            Переглянути новинки
          </Button>
        </>
      )}
    </div>
  )
}

export default Cart
