const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class Product {
  static sqlQueries = {
    findAll: `
        SELECT * 
        FROM product;
        `,
    findMenProducts: `
        SELECT * 
        FROM terabade.product
        WHERE sex = "male";
        `,
    findById: `
        SELECT * 
        FROM terabade.product 
        WHERE ProductID = ?;
    `,
  }

  static async commitQuery(sql, data) {
    let connection
    try {
      connection = await db.promisePool.getConnection()
      const result = await connection.execute(sql, data)
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
    const products = await Product.commitQuery(Product.sqlQueries.findAll)
    return products
  }
  static async findMenProducts() {
    const menProducts = await Product.commitQuery(
      Product.sqlQueries.findMenProducts,
    )
    return menProducts
  }
  static async findById(id) {
    const dataForDB = []
    dataForDB.push(id)
    const product = await Product.commitQuery(
      Product.sqlQueries.findById,
      dataForDB,
    )
    return product
  }
}

module.exports = { Product }
