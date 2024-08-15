import { useContext } from "react"
import Modal from "../UI/Modal/Modal"
import { CartContext } from "../../context/CartContext"
import styles from "./Cart.module.css"
import CartItem from "./CartItem/CartItem"
import Button from "../UI/Button/Button"
import { useNavigate } from "react-router-dom"
const Cart = () => {
  const { isOpened, cartItems, closeCart } = useContext(CartContext)
  const navigate = useNavigate()
  function handleToCart() {
    closeCart()
    navigate("/cart")
  }
  function handleToPayment() {
    closeCart()
    navigate("/payment")
  }
  return (
    <Modal open={isOpened} className={styles.cart}>
      <div className={styles.classItemsWrapper}>
        {cartItems.map((cartItem) => {
          return <CartItem item={cartItem} key={cartItem.id} />
        })}
      </div>
      {cartItems.length ? (
        <div className={styles.buttonsWrapper}>
          <Button
            variant="primaryWhite"
            onClick={handleToCart}
            className={styles.addButton}
          >
            До кошика
          </Button>
          <Button onClick={handleToPayment} className={styles.payButton}>
            Сплатити
          </Button>
        </div>
      ) : (
        <h1
          style={{
            textAlign: "center",
            position: "absolute",
            top: "10%",
            right: "2%",
          }}
        >
          У вашому кошику немає товарів
        </h1>
      )}
    </Modal>
  )
}

export default Cart
