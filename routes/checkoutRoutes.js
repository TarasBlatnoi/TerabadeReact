"use strict"

const express = require("express")
const checkoutController = require("../controllers/checkoutController.js")
const router = new express.Router()

router.post("/create-payment-intent", checkoutController.createPaymentIntent)

module.exports = router
