const { createGenderString } = require("../utils/createGendersString")

exports.paginatedResults = (dbCallback, dbCount) => {
  return async (req, res, next) => {
    const limit = Number(req.query.limit) || 6
    const page = Number(req.query.page) || 1
    if (limit <= 0 || page <= 0) {
      return res.status(400).json({ message: "Invalid query parameters" })
    }

    const gender = req.query.gender
    const genderString = createGenderString(req.path, gender)

    const results = {}
    const offset = limit * (page - 1)

    try {
      const { count } = await dbCount(genderString)
      if (offset > 0) {
        results.previous = {
          page: page - 1,
          limit,
        }
      }

      const nextOffset = offset + limit
      if (nextOffset < count) {
        results.next = {
          page: page + 1,
          limit,
        }
      }

      results.results = await dbCallback(limit, offset, genderString)
      res.paginatedResults = results
      next()
    } catch (err) {
      console.error("Error in paginatedResults middleware:", err)
      res.status(500).json({ message: err.message })
    }
  }
}
