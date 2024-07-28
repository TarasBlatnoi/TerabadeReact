"use strict"

const express = require("express")
const productController = require("../controllers/productController")
const router = new express.Router()
router.route("/").get(productController.getAllproducts)
router.route("/men").get(productController.getMenProducts)
router.route("/women").get(productController.getWomenProducts)
router.route("/children").get(productController.getChildrenProducts)
router.route("/:id").get(productController.getProductById)
//   .post(productController.createProduct)

// router
//   .route("/:id")
//   .get(productController.getProductById)
//   .patch(productController.updateProduct)
//   .delete(productController.deleteProduct)

module.exports = router
