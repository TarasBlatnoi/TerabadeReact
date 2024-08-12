const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class Product {
  static sql = {
    createPlaceholders(quantity) {
      let placeHoldersString = "?"
      for (let i = 0; i < quantity; i++) {
        if (i === quantity - 1) {
          placeHoldersString + "?"
          return placeHoldersString
        }
        placeHoldersString += ", ?"
      }
    },
    findImagesForProducts: `
        SELECT ImageURL, ImageOrder, Images.ProductID 
        FROM 
        product JOIN Images 
        ON product.ProductID = Images.ProductID
        WHERE product.ProductID IN (PLACE_HOLDER)
        ORDER BY Images.ProductID, ImageOrder;
    `,
    findAll: `
        SELECT * 
        FROM terabade.product;
        `,
    findMenProducts: `
        SELECT  *
        FROM terabade.product
        WHERE sex = "men"
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

  static bindImagesToProducts(products, images) {
    const ProductsWithImages = products.map((product) => {
      product.images = images.filter(
        (image) => product.ProductID === image.ProductID,
      )
      return product
    })
    return ProductsWithImages
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
    const images = await Product.findImagesForProducts(menProducts)
    const menProductsWithImages = Product.bindImagesToProducts(
      menProducts,
      images,
    )
    return menProductsWithImages
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
