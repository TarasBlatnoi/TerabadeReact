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
    findSizesForProduct: `
        SELECT SizeLabel, InStock
        FROM 
        product JOIN ProductSizes 
        ON product.ProductID = ProductSizes.ProductID
        JOIN Sizes ON Sizes.SizeID = ProductSizes.SizeID
        WHERE product.ProductID = ?
        ORDER BY  StockQuantity;
    `,
    findAll: `
        SELECT * 
        FROM terabade.product;
        `,
    findMenProducts: `
        SELECT  product.ProductID, name, sex, type, color, price, productDetails, ImageURL
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
    const [product, images, sizes] = await Promise.all([
      Product.commitQuery(Product.sql.findById, [id]),
      Product.findImagesForProduct(id),
      Product.findSizesForProduct(id),
    ])
    product[0].images = images
    product[0].sizes = sizes
    return product
  }

  static async findImagesForProduct(id) {
    const images = await Product.commitQuery(Product.sql.findImagesForProduct, [
      id,
    ])
    return images
  }

  static async findSizesForProduct(id) {
    const sizes = await Product.commitQuery(Product.sql.findSizesForProduct, [
      id,
    ])
    return sizes
  }
}

module.exports = { Product }
