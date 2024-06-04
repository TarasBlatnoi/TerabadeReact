const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { User } = require("../models/User")
const verifyPassword = require("./verifyPassword")

const customFields = {
  usernameField: "email",
  passwordField: "password",
}

const verifyCallback = async  (username, password, done) => {
  try {
    const user = await User.checkUnique(username)

    if (!user.length) {
      return done(null, false)
    }

    const isValid = await verifyPassword(password, user[0].hashed_password)
    if (isValid) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    done(err)
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user[0].UserID)
})

passport.deserializeUser((UserID, done) => {
  User.getById(UserID)
    .then((user) => {
      done(null, user[0])
    })
    .catch((err) => done(err))
})
