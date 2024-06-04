"use strict"

const express = require("express")
const favoriteProductController = require("../controllers/favoriteProductController.js")
const { isAuth } = require("../auth/middleware")
const router = new express.Router()
const getHTMLFavorite = (req, res, next) => {
  res.sendFile(__dirname + "/views/favorites.html")
}
const getJSFavorite = (req, res, next) => {
  res.sendFile(__dirname + "/views/favorites.js")
}

router.use(isAuth)
router.get("/", getHTMLFavorite)
router.get("/Favorites.js", getJSFavorite)
router.get("/products", favoriteProductController.getAllFavoriteproducts)
router.post("/products", favoriteProductController.addToFavorite)
router.delete("/products", favoriteProductController.deleteFavoriteProduct)
module.exports = router
