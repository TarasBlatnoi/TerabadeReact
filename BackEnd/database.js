"use strict"

require("dotenv").config()
const promiseMysql = require("mysql2/promise")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)

const access = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
}

const sessionStore = new MySQLStore(access)

const promisePool = promiseMysql.createPool(access)

module.exports = {
  promisePool,
  sessionStore,
  session,
}
