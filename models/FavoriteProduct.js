const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class FavoriteProduct {
  static sqlQueries = {
    getAll: `
    SELECT 
    product.ProductID, 
    name, 
    sex, 
    type, 
    color, 
    price, 
    productDetails, 
    ImageURL
    FROM 
    product 
    JOIN 
    favoriteproduct 
    ON product.ProductID = favoriteproduct.Product_ProductID
    JOIN 
    Images 
    ON product.ProductID = Images.ProductID 
    WHERE 
    ImageOrder = 0 
    AND favoriteproduct.User_UserID = ?;
        `,
    addToFavorite: `
        INSERT INTO  favoriteproduct(User_UserID, Product_ProductID) VALUES(?,?);
        `,
    deleteFromFavorite: `
    DELETE FROM favoriteproduct 
    WHERE (User_UserID = ?) AND (Product_ProductID = ?);
    `,
    existInDB: `
      SELECT *
      FROM favoriteproduct
      WHERE User_UserID = ? AND Product_ProductID = ?;
    `,
  }

  static async commitQuery(sql, data) {
    let connection
    const filteredData = data.filter((element) => element)
    try {
      connection = await db.promisePool.getConnection()
      const [result] = await connection.execute(sql, filteredData)
      imageToBase64(result)
      return result
    } catch (err) {
      console.error(err)
    } finally {
      if (connection) {
        await connection.release()
      }
    }
  }

  static async modifyFavoriteProduct(userId, ProductID, sqlQuery) {
    const dataForDB = [userId, ProductID]
    const result = await FavoriteProduct.commitQuery(sqlQuery, dataForDB)
    if (Array.isArray(result)) {
      return result
    } else {
      if (result.affectedRows > 0) {
        return true
      }
      return {
        status: 204,
        message: "Product was not in favorites, nothing to delete.",
      }
    }
  }

  static isExistInDB(userId, ProductID) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      ProductID,
      FavoriteProduct.sqlQueries.existInDB,
    )
  }

  static async findAllFavoriteProducts(userId) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      null,
      FavoriteProduct.sqlQueries.getAll,
    )
  }

  static async addFavoriteProduct(userId, ProductID) {
    const exist = await FavoriteProduct.isExistInDB(userId, ProductID)
    if (!exist.length) {
      return FavoriteProduct.modifyFavoriteProduct(
        userId,
        ProductID,
        FavoriteProduct.sqlQueries.addToFavorite,
      )
    } else {
      throw { message: "such product already exist", status: 409 }
    }
  }

  static async deleteFavoriteProduct(userId, ProductID) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      ProductID,
      FavoriteProduct.sqlQueries.deleteFromFavorite,
    )
  }
}

module.exports = { FavoriteProduct }
