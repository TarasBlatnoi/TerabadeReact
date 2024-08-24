"use strict"

const express = require("express")
const productController = require("../controllers/productController")
const router = new express.Router()
router.route("/").get(productController.getProducts)
router.route("/men").get(productController.getProducts)
router.route("/women").get(productController.getProducts)
router.route("/children").get(productController.getProducts)
router.route("/:id").get(productController.getProductById)
//   .post(productController.createProduct)

// router
//   .route("/:id")
//   .get(productController.getProductById)
//   .patch(productController.updateProduct)
//   .delete(productController.deleteProduct)

module.exports = router
