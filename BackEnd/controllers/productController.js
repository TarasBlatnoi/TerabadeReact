"use strict"

const { Product } = require("../models/Product.js")

const asyncWrapper = (callback) => {
  return async function (req, res) {
    const args = []
    try {
      if (req.params.id) {
        args.push(req.params.id)
      }
      if (req.body) {
        args.push(req.body)
      }
      const result = await callback(...args)
      if (result.length) {
        res.status(200).json({ result })
      } else {
        res.status(404).json({ errorMessage: "No such product" })
      }
    } catch (err) {
      console.error(err)
      res.status(404).json({ errorMessage: err.message })
    }
  }
}

const getAllproducts = asyncWrapper(Product.findAllProducts)
// const getProductById = asyncWrapper(Product.getById)
// const createProduct = asyncWrapper(Product.create)
// const updateProduct = asyncWrapper(Product.updateById)
// const deleteProduct = asyncWrapper(Product.deleteById)

module.exports = {
  getAllproducts,
  //   getProductById,
  //   createProduct,
  //   updateProduct,
  //   deleteProduct,
}
