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
        SELECT product.ProductID, name, sex, type, color, price, productDetails, ImageURL
        FROM terabade.product 
        LEFT JOIN terabade.Images ON product.ProductID = Images.ProductID
        WHERE sex in (GENDERS_STRING) AND (Images.ImageOrder = 0 OR Images.ImageOrder IS NULL)
        ORDER BY ProductID
        LIMIT ? OFFSET ?;
        `,
    findMenProducts: `
    SELECT  
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL, 
    GROUP_CONCAT(
        CASE 
            WHEN InStock = 1 THEN SizeLabel
        END ORDER BY SizeLabel ASC SEPARATOR ' / '
    ) AS Sizes
    FROM 
    terabade.product 
    LEFT JOIN 
    terabade.Images ON product.ProductID = Images.ProductID 
    LEFT JOIN 
    ProductSizes ON product.ProductID = ProductSizes.ProductID 
    LEFT JOIN 
    Sizes ON Sizes.SizeID = ProductSizes.SizeID
    WHERE 
    sex = 'men' 
    AND (Images.ImageOrder = 0 OR Images.ImageOrder IS NULL)
    GROUP BY 
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL;
        `,
    findWomenProducts: `
    SELECT  
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL, 
    GROUP_CONCAT(
        CASE 
            WHEN InStock = 1 THEN SizeLabel
        END ORDER BY SizeLabel ASC SEPARATOR ' / '
    ) AS Sizes
    FROM 
    terabade.product 
    LEFT JOIN 
    terabade.Images ON product.ProductID = Images.ProductID 
    LEFT JOIN 
    ProductSizes ON product.ProductID = ProductSizes.ProductID 
    LEFT JOIN 
    Sizes ON Sizes.SizeID = ProductSizes.SizeID
    WHERE 
    sex = 'women' 
    AND (Images.ImageOrder = 0 OR Images.ImageOrder IS NULL)
    GROUP BY 
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL;

    `,
    findChildrenPoducts: `
    SELECT  
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL, 
    GROUP_CONCAT(
        CASE 
            WHEN InStock = 1 THEN SizeLabel
        END ORDER BY SizeLabel ASC SEPARATOR ' / '
    ) AS Sizes
    FROM 
    terabade.product 
    LEFT JOIN 
    terabade.Images ON product.ProductID = Images.ProductID 
    LEFT JOIN 
    ProductSizes ON product.ProductID = ProductSizes.ProductID 
    LEFT JOIN 
    Sizes ON Sizes.SizeID = ProductSizes.SizeID
    WHERE 
    sex = 'children' 
    AND (Images.ImageOrder = 0 OR Images.ImageOrder IS NULL)
    GROUP BY 
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL;
    `,
    countRows: `
    SELECT COUNT(*) as count FROM terabade.product WHERE sex in (GENDERS_STRING);
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

  static async countProducts(gendersString) {
    const query = Product.sql.countRows.replace("GENDERS_STRING", gendersString)
    const count = await Product.commitQuery(query)
    return count[0]
  }

  static async findAllProducts(...args) {
    const sql = Product.sql.findAll.replace(
      "GENDERS_STRING",
      args[args.length - 1],
    )
    args.pop()
    const stringArgs = args.map((arg) => arg.toString())
    const products = await Product.commitQuery(sql, stringArgs)
    return products
  }

  static async findMenProducts() {
    const menProducts = await Product.commitQuery(Product.sql.findMenProducts)
    menProducts.forEach((product) => {
      const Sizes = product.Sizes?.split(" / ")
      product.Sizes = Sizes
    })
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
