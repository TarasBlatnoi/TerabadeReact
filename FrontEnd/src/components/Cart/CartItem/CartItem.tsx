import { useContext } from "react"
import { CartContext, CartItemType } from "../../../context/CartContext"

interface CartItemProps {
  item: CartItemType
}
const CartItem = ({ item }: CartItemProps) => {
  const { deleteCartItem, addCartItem } = useContext(CartContext)
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <img
        src={`data:image/jpeg;base64,${item.image}`}
        alt={item.name}
        style={{ width: "10vw", height: "10vh" }}
      />
      <h3>{item.name}</h3>
      <p>{item.quantity}</p>
      <button
        onClick={() => {
          deleteCartItem(item.id)
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          addCartItem(item)
        }}
      >
        +
      </button>
    </div>
  )
}

export default CartItem
