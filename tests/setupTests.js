// test/setupTests.js
// changes
const db = require("../database")
const { app } = require("../server")
require("dotenv").config()

afterAll(async () => {
  await db.promisePool.end()
})

module.exports = app
