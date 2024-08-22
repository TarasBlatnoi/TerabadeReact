import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation } from "react-query"
import PaymentAPI from "../../api/Payment/PaymentAPI"
import { useEffect } from "react"
import { useCart } from "../../context/CartContext"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"

const stripePromise = loadStripe(
  "pk_test_51PqCC4CRwWotuxtmDHgDXKYRkOgqSsZhxzIye3rzobQkzmijwtCqE3AYEQAGD82rZYkkGrKPJQBlOpQzkeW0wNto00L12JvHps",
)

const Checkout = () => {
  const { cartItems } = useCart()
  const {
    data: clientSession,
    mutate,
    isLoading,
  } = useMutation({
    mutationFn: PaymentAPI.startCheckout,
  })
  useEffect(() => {
    mutate({ items: cartItems })
  }, [])

  const options = {
    clientSecret: clientSession?.clientSecret,
  }

  return (
    <>
      {!isLoading && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default Checkout
