"use strict"

const { FavoriteProduct } = require("../models/FavoriteProduct.js")

const asyncWrapper = (callback) => {
  return async function (req, res) {
    const args = []
    try {
      args.push(req.user.UserID)
      if (req.body) {
        args.push(req.body.ProductID)
      }
      const result = await callback(...args)
      res.status(200).json({ result })
    } catch (err) {
      console.error(err)
      res.status(404).json({ errorMessage: err.message })
    }
  }
}

const getAllFavoriteproducts = asyncWrapper(
  FavoriteProduct.findAllFavoriteProducts,
)
const addToFavorite = asyncWrapper(FavoriteProduct.addFavoriteProduct)
const deleteFavoriteProduct = asyncWrapper(
  FavoriteProduct.deleteFavoriteProduct,
)
// const createProduct = asyncWrapper(Product.create)
// const updateProduct = asyncWrapper(Product.updateById)

module.exports = {
  getAllFavoriteproducts,
  addToFavorite,
  deleteFavoriteProduct,
  //   createProduct,
  //   updateProduct,
}
