const express = require("express")
const path = require("path")
const router = new express.Router()
const passport = require("passport")
const userController = require("../controllers/userController")
const { isAuth, isAdmin } = require("../auth/middleware")

router.post("/login", (req, res, next) => {
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
