"use strict"

const { Review } = require("../models/Reviews")

const asyncWrapper = (callback) => {
  return async function (req, res) {
    const args = []
    try {
      args.push(req.user.UserID)
      if (req.params.id) {
        args.push(req.params.id)
      }
      if (req.body) {
        args.push(req.body)
      }
      const responseFromDb = await callback(...args)

      if (responseFromDb.affectedRows === 1) {
        res.status(200).json({
          status: "success",
          message: "Review added successfully",
        })
      } else {
        res.status(404).json({ errorMessage: "No such product" })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ errorMessage: err.message })
    }
  }
}

const addReview = asyncWrapper(Review.addReview)

module.exports = {
  addReview,
}
