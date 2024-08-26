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
  function handleToCheckout() {
    closeCart()
    navigate("/checkout")
  }

  return (
    <Modal
      open={isOpened}
      className={styles.cart}
      closeModal={closeCart}
      dialogFirst
    >
      <div className={styles.classItemsWrapper}>
        {cartItems.map((cartItem) => {
          return (
            <CartItem item={cartItem} key={`${cartItem.id}${cartItem.size}`} />
          )
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
          <Button onClick={handleToCheckout} className={styles.payButton}>
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
