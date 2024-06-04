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
require("./auth/passport")
const session = db.session

const app = express()
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

app.use(express.static(path.join(__dirname, "../public")))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/favorites", favoriteRoutes)
app.use("/", authenticationRoutes)

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
