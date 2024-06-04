const express = require("express")
const path = require("path")
const router = new express.Router()
const passport = require("passport")
const userController = require("../controllers/userController")
const { isAuth, isAdmin } = require("../auth/middleware")

router.route("/login").post(
  // (req, res, next) => {
  //   // Access form data
  //   const { email, password } = req.body

  //   console.log("Email:", email)
  //   console.log("Password:", password)

  //   // ... rest of the code
  //   next()
  // },

  passport.authenticate("local", {
    failureRedirect: "/login.html",
    successRedirect: "/",
  }),
)

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
    res.redirect("/login.html")
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

router.route("/register").post(userController.createNewUser)
module.exports = router
