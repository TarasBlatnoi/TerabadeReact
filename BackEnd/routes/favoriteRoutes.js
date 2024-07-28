"use strict"

const express = require("express")
const favoriteProductController = require("../controllers/favoriteProductController.js")
const { isAuth } = require("../auth/middleware")
const router = new express.Router()

router.use(isAuth)
router.get("/", favoriteProductController.getAllFavoriteproducts)
router.post("/", favoriteProductController.addToFavorite)
router.delete("/", favoriteProductController.deleteFavoriteProduct)
module.exports = router
