import { CartItemType } from "../../context/CartContext"
import { client } from "../instance"

class PaymentAPI {
  async startCheckout(body: { items: CartItemType[] }) {
    const { data } = await client.post("/checkout/create-payment-intent", body)
    return data
  }
}

export default new PaymentAPI()
