const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class Product {
  static sql = {
    findImagesForProduct: `
        SELECT ImageURL, ImageOrder, Images.ProductID 
        FROM 
        product JOIN Images 
        ON product.ProductID = Images.ProductID
        WHERE product.ProductID = ?
        ORDER BY  ImageOrder;
    `,
    findAll: `
        SELECT * 
        FROM terabade.product;
        `,
    findMenProducts: `
        SELECT  product.ProductID, name, sex, type, color, price, size, productDetails, ImageURL
        FROM terabade.product JOIN terabade.Images ON product.ProductID = Images.ProductID
        WHERE sex = "men" AND ImageOrder = 0
        LIMIT 9;
        `,
    findWomenProducts: `
        SELECT * 
        FROM terabade.product
        WHERE sex = "women";
    `,
    findChildrenPoducts: `
        SELECT * 
        FROM terabade.product
        WHERE sex = "children";
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
      //imageToBase64(result[0])
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
    const products = await Product.commitQuery(Product.sql.findAll)
    return products
  }
  static async findMenProducts() {
    const menProducts = await Product.commitQuery(Product.sql.findMenProducts)
    console.log(menProducts)
    return menProducts
  }

  static async findWomenProducts() {
    const womenProducts = await Product.commitQuery(
      Product.sql.findWomenProducts,
    )
    return womenProducts
  }
  static async findChildrenPoducts() {
    const childrenProducts = await Product.commitQuery(
      Product.sql.findChildrenPoducts,
    )
    return childrenProducts
  }
  static async findById(id) {
    const dataForDB = []
    dataForDB.push(id)
    const product = await Product.commitQuery(Product.sql.findById, dataForDB)
    return product
  }

  static async findImagesForProducts(products) {
    const productIds = products.map((product) => product.ProductID)
    const placeHolders = Product.sql.createPlaceholders(products.length)
    const queryWithPlaceholders = Product.sql.findImagesForProducts.replace(
      "PLACE_HOLDER",
      placeHolders,
    )
    const images = await Product.commitQuery(queryWithPlaceholders, productIds)
    return images
  }
}

module.exports = { Product }
