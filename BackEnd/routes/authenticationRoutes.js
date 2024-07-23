const express = require("express")
const path = require("path")
const router = new express.Router()
const passport = require("passport")
const userController = require("../controllers/userController")
const { isAuth, isAdmin } = require("../auth/middleware")
const { check, validationResult } = require("express-validator")

const loginValidationRules = [
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("password").exists().withMessage("Password is required"),
]

router.post("/login", loginValidationRules, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.json({ message: "Login successful", user })
    })
  })(req, res, next)
})

router.get("/protected-route", isAuth, (req, res) => {
  res.send("You made it to the route.")
})

router.get("/admin-route", isAdmin, (req, res) => {
  res.send("You made it to the admin route.")
})

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.send({ message: "Logout successfully" })
  })
})

router.get("/login-success", (req, res) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>',
  )
})

router.get("/login-failure", (req, res) => {
  res.send("You entered the wrong password.")
})

router.get("/api/v1/checkUser", (req, res, next) => {
  if (req.user) {
    const user = {
      UserID: req.user.UserID,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    }
    res.json(user)
  }
  next()
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
