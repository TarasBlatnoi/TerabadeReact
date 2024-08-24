"use strict"

const { Product } = require("../models/Product.js")
const { createGenderFilterString } = require("../utils/createGendersString.js")
const { paginatedResult } = require("../utils/paginatedResult.js")
const catchAsync = require("../utils/catchAsync.js")

const getProducts = catchAsync(async (req, res) => {
  const filterString = createGenderFilterString(req.path, req.query.gender)
  const pageOptions = {}
  pageOptions.page = req.query.page || 1
  pageOptions.limit = req.query.limit || 9
  const response = await paginatedResult(
    Product.countProducts,
    filterString,
    pageOptions,
  )
  const offset = (pageOptions.page - 1) * pageOptions.limit
  const products = await Product.findAllProducts(
    pageOptions.limit,
    offset,
    filterString,
  )
  response.response = products
  res.json(response)
})

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
        args.push([...req.query.gender])
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

const getProductById = asyncWrapper(Product.findById)
const getImagesForProduct = asyncWrapper(Product.findImagesForProduct)
// const updateProduct = asyncWrapper(Product.updateById)
// const deleteProduct = asyncWrapper(Product.deleteById)

module.exports = {
  getProductById,
  getProducts,
  getImagesForProduct,
  //   updateProduct,
  //   deleteProduct,
}
