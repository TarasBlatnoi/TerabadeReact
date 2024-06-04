"use strict"

const express = require("express")
const productController = require("../controllers/productController")
const router = new express.Router()
router.route("/").get(productController.getAllproducts)
//   .post(productController.createProduct)

// router
//   .route("/:id")
//   .get(productController.getProductById)
//   .patch(productController.updateProduct)
//   .delete(productController.deleteProduct)

module.exports = router
