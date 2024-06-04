const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class Product {
  static sqlQueries = {
    getAll: `
        SELECT * 
        FROM product;
        `,
  }

  static async commitQuery(sql) {
    let connection
    try {
      connection = await db.promisePool.getConnection()
      const result = await connection.execute(sql)
      imageToBase64(result[0])
      return result[0]
    } catch (err) {
      console.error(err)
    } finally {
      if (connection) {
        await connection.release()
      }
    }
  }

  static async findAllProducts() {
    const products = await Product.commitQuery(Product.sqlQueries.getAll)
    return products
  }
}

module.exports = { Product }
