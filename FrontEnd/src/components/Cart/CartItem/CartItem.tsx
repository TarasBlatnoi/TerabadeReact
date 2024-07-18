import { CartItemType } from "../../../context/CartContext"

interface CartItemProps {
  item: CartItemType
}
const CartItem = ({ item }: CartItemProps) => {
  console.log(item.image)
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <img
        src={`data:image/jpeg;base64,${item.image}`}
        alt={item.name}
        style={{ width: "10vw", height: "10vh" }}
      />
      <h3>{item.name}</h3>
      <p>{item.quantity}</p>
    </div>
  )
}

export default CartItem
