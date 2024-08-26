import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation } from "react-query"
import PaymentAPI from "../../api/Payment/PaymentAPI"
import { useEffect } from "react"
import { useCart } from "../../context/CartContext"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import Spinner from "../../components/LoadingSpinner/Spinner"
import CheckoutItemList from "../../components/CheckoutForm/CheckoutItemList/CheckoutItemList"
import styles from "./Checkout.module.css"

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

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <Elements
          stripe={stripePromise}
          options={{
            appearance: {
              theme: "flat",
              variables: {
                colorText: "black",
                colorTextPlaceholder: "black",
                colorBackground: "#ededed",
              },
            },

            clientSecret: clientSession?.clientSecret,
          }}
        >
          {" "}
          <div className={styles.itemsContainer}>
            <CheckoutForm />
            <CheckoutItemList />
          </div>
        </Elements>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Checkout
