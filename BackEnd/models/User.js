const db = require("../database")
const hashPassword = require("../auth/hashPassword")
//const verifyPassword = require("../verifyPassword")
class User {
  static sqlQueries = {
    createNewUser: `
        INSERT INTO user (email, hashed_password)
        VALUES ( ?, ?);
        `,
    getById: `
        SELECT * FROM user WHERE UserID = ?;
        `,
    checkUnique: `
    SELECT * FROM user WHERE email = ?;
    `,
  }

  static async commitQuery(sql, data) {
    const arrData = []
    for (const item in data) {
      arrData.push(data[item])
    }
    let connection
    try {
      connection = await db.promisePool.getConnection()
      const [result] = await connection.execute(sql, arrData)
      return result
    } catch (err) {
      console.error(err)
    } finally {
      if (connection) {
        await connection.release()
      }
    }
  }

  static async createNewUser(data) {
    const passwordHash = await hashPassword(data.password)
    const unique = await User.checkUnique(data.email)
    if (!unique.length) {
      data.password = passwordHash
      const res = await User.commitQuery(User.sqlQueries.createNewUser, data)
      const createdUserId = res.insertId
      const createdUser = await User.getById(createdUserId)
      return createdUser
    }
    throw new Error("User with that mail exists")
  }
  static async getById(id) {
    const dataForDB = []
    dataForDB.push(id)
    const user = await User.commitQuery(User.sqlQueries.getById, dataForDB)
    return user
  }
  static async checkUnique(dataToCheck) {
    const result = await User.commitQuery(User.sqlQueries.checkUnique, [
      dataToCheck,
    ])
    return result
  }
}

module.exports = { User }
