import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"
import styles from "./CheckoutForm.module.css"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
    })
    console.log(result)
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      navigate("/")
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.totalContainer}>
        <h1 className={styles.total}>
          Total: <span>3499UAH</span>
        </h1>
      </div>
      <div>
        <PaymentElement />
      </div>
      <button disabled={!stripe} className={styles.submitButtn}>
        Submit
      </button>
    </form>
  )
}

export default CheckoutForm
