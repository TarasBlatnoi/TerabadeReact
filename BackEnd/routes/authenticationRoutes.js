const express = require("express")
const path = require("path")
const router = new express.Router()
const passport = require("passport")
const userController = require("../controllers/userController")
const { check, validationResult } = require("express-validator")

const loginValidationRules = [
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("password")
    .exists()
    .isLength({ min: 3 })
    .withMessage("Password is min 3 characters"),
]

router.post("/login", loginValidationRules, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({
        errors: [{ msg: "Wrong email or password" }],
      })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.json({
        message: "Login successful",
        user: { email: user[0].email, isAdmin: user[0].isAdmin },
      })
    })
  })(req, res, next)
})

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return res.json({
        errors: [{ msg: "Couldn't logout" }],
      })
    }
    res.send({ message: "Logout successfully" })
  })
})

router.get("/check-auth", (req, res, next) => {
  if (req.user && req.isAuthenticated()) {
    const user = {
      id: req.user.UserID,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    }
    res.json({
      status: "success",
      authenticated: true,
      user,
    })
  } else {
    res.json({
      status: "success",
      authenticated: false,
    })
  }
})

const registerValidationRules = [
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]

router
  .route("/register")
  .post(registerValidationRules, userController.createNewUser)
module.exports = router
