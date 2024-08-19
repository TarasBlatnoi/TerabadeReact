import CartCheckoutList from "../../components/CartCheckoutList/CartCheckoutList"
import CartCheckoutSummary from "../../components/CartCheckoutSummary/CartCheckoutSummary"
import styles from "./Cart.module.css"

function Cart() {
  return (
    <div className={styles.container}>
      <section className={styles.leftContainer}>
        <CartCheckoutList />
      </section>
      <section className={styles.rightContainer}>
        <CartCheckoutSummary />
      </section>
    </div>
  )
}

export default Cart
