"use strict"

const { User } = require("../models/User.js")

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
      await callback(...args)
      res.redirect("/login.html")
    } catch (err) {
      console.error(err)
      res.status(404).json({ errorMessage: err.message })
    }
  }
}

const createNewUser = asyncWrapper(User.createNewUser)
const getUserById = asyncWrapper(User.getById)

module.exports = {
  createNewUser,
  getUserById,
  //   createProduct,
  //   updateProduct,
  //   deleteProduct,
}
