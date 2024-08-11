import { useContext } from "react"
import Modal from "../UI/Modal/Modal"
import { CartContext } from "../../context/CartContext"
import styles from "./Cart.module.css"
import CartItem from "./CartItem/CartItem"
import Button from "../UI/Button/Button"
const Cart = () => {
  const { isOpened, closeCart, cartItems, resetCartItems } =
    useContext(CartContext)
  return (
    <Modal open={isOpened} className={styles.cart}>
      <div className={styles.classItemsWrapper}>
        {cartItems.map((cartItem) => {
          return <CartItem item={cartItem} key={cartItem.id} />
        })}
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          variant="primaryWhite"
          onClick={closeCart}
          className={styles.addButton}
        >
          До кошика
        </Button>
        <Button onClick={resetCartItems} className={styles.payButton}>
          Сплатити
        </Button>
      </div>
    </Modal>
  )
}

export default Cart
