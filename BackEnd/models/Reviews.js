const db = require("../database")

class Review {
  static sqlQueries = {
    getAll: `
        SELECT *
        FROM Reviews
        `,
    addReview: `
        INSERT INTO terabade.Reviews (text, ProductID, UserID) 
        VALUES (?, ?, ?);
        `,
    // To do
    // isMoreThan2: ``,
  }

  static async commitQuery(sql, data) {
    let connection
    const filteredData = data.filter((element) => element)
    try {
      connection = await db.promisePool.getConnection()
      const [result] = await connection.execute(sql, filteredData)
      return result
    } catch (err) {
      console.error(err)
    } finally {
      if (connection) {
        await connection.release()
      }
    }
  }

  // static isMoreThan2(userId, ProductID) {
  //   return FavoriteProduct.modifyFavoriteProduct(
  //     userId,
  //     ProductID,
  //     FavoriteProduct.sqlQueries.isMoreThan2,
  //   )
  // }

  static async addReview(userId, body) {
    const { text, ProductID } = body
    const res = await Review.commitQuery(Review.sqlQueries.addReview, [
      text,
      ProductID,
      userId,
    ])
    return res
  }
}

module.exports = { Review }
