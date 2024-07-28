"use strict"

const { validationResult } = require("express-validator")
const { User } = require("../models/User.js")

const asyncWrapper = (callback) => {
  return async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const args = []
    try {
      if (req.params.id) {
        args.push(req.params.id)
      }
      if (req.body) {
        args.push(req.body)
      }
      const dbResult = await callback(...args)
      res.status(201).json({
        message: "User interaction with db successfull",
        user: {
          user: { email: dbResult[0].email, isAdmin: dbResult[0].isAdmin },
        },
      })
    } catch (err) {
      console.error(err)
      res.status(err.status).json({ errorMessage: err.message })
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
