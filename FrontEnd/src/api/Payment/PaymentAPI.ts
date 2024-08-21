import { client } from "../instance"

class PaymentAPI {
  async startCheckout(body) {
    const { data } = await client.post("/checkout/create-payment-intent", body)
    return data
  }
}

export default new PaymentAPI()
