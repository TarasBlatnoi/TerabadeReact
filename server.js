"use strict"

require("dotenv").config()
const path = require("path")
const express = require("express")
const db = require("./database")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const passport = require("passport")
const authenticationRoutes = require("./routes/authenticationRoutes")
const favoriteRoutes = require("./routes/favoriteRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const cors = require("cors")
require("./auth/passport")
const session = db.session

const app = express()

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:5173",
  "https://terabade-dfdc3e3cb126.herokuapp.com",
  "https://r.stripe.com/b",
]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "FrontEnd/dist")))
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: db.sessionStore,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/favorites", favoriteRoutes)
app.use("/api/v1", authenticationRoutes)
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/checkout", checkoutRoutes)

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "FrontEnd/dist", "index.html"))
})
app.use((err, req, res, next) => {
  console.error(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  if (err) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message })
  }
})
const closeServer = (server) => {
  return new Promise((resolve, reject) => {
    console.log("\nStarting the process of closing the app...")
    db.promisePool
      .end()
      .then(() => {
        server.close((err) => {
          if (err) {
            reject(err)
          } else {
            console.log("App is closed :(")
            resolve()
          }
        })
      })
      .catch((err) => {
        console.error("Error while closing the app: " + err.message)
        reject(err)
      })
  })
}

module.exports = { app, closeServer }
