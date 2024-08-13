"use strict"

const express = require("express")
const reviewController = require("../controllers/reviewController")
const { isAuth } = require("../auth/middleware")

const router = new express.Router()
router.use(isAuth)
router.route("/").post(reviewController.addReview)

module.exports = router
