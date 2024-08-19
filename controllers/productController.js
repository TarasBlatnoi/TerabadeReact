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
      if (req.query.gender) {
        args.push(req.query.gender)
      }
      const data = await callback(...args)
      if (data.length) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ errorMessage: "No such product" })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ errorMessage: err.message })
    }
  }
}

const getAllproducts = asyncWrapper(Product.findAllProducts)
const getMenProducts = asyncWrapper(Product.findMenProducts)
const getProductById = asyncWrapper(Product.findById)
const getWomenProducts = asyncWrapper(Product.findWomenProducts)
const getChildrenProducts = asyncWrapper(Product.findChildrenPoducts)
const getImagesForProduct = asyncWrapper(Product.findImagesForProduct)
// const updateProduct = asyncWrapper(Product.updateById)
// const deleteProduct = asyncWrapper(Product.deleteById)

module.exports = {
  getAllproducts,
  getProductById,
  getMenProducts,
  getWomenProducts,
  getChildrenProducts,
  getImagesForProduct,
  //   updateProduct,
  //   deleteProduct,
}
