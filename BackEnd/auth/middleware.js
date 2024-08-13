module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(300).json({
      msg: "You have to log in first",
    })
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not an admin.",
    })
  }
}
