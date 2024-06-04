const db = require("../database")
const { imageToBase64 } = require("../utils/imageToBase64")
class FavoriteProduct {
  static sqlQueries = {
    getAll: `
        SELECT *
        FROM product
        WHERE ProductID IN (
        SELECT Product_ProductID
        FROM favoriteproduct
        WHERE User_UserID = ?
        );
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
      throw new Error("No rows changed")
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
      throw new Error("such product already exist")
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
