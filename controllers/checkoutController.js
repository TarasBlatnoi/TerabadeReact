const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const calculateCartCost = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0
  items.forEach((item) => {
    total += Number(item.quantity) * Number(item.price) * 100
  })
  return total
}

exports.createPaymentIntent = async (req, res) => {
  const { items } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateCartCost(items),
    currency: "UAH",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}
