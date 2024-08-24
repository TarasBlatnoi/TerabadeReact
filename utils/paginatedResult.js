exports.paginatedResult = async (countItems, filterString, pageOptions) => {
  const parsedPage = parseInt(pageOptions.page, 10)
  const parsedLimit = parseInt(pageOptions.limit, 10)
  if (parsedLimit <= 0 || parsedPage <= 0) {
    const error = new Error(
      "Invalid pagination options. 'page' and 'limit' must be positive integers.",
    )
    error.statusCode = 400
    error.status = "failed"
    throw error
  }

  const results = {}
  const offset = parsedLimit * (parsedPage - 1)
  const { count } = await countItems(filterString)

  if (offset >= count && count !== 0) {
    const error = new Error(`Page ${parsedPage} exceeds available data.`)
    error.statusCode = 400
    error.status = "failed"
    throw error
  }

  if (offset > 0) {
    results.previous = {
      page: parsedPage - 1,
      limit: parsedLimit,
    }
  }

  const nextOffset = offset + parsedLimit
  if (nextOffset < count) {
    results.next = {
      page: parsedPage + 1,
      limit: parsedLimit,
    }
  }

  return {
    ...results,
    totalResults: count,
    currentPage: parsedPage,
    totalPages: Math.ceil(count / parsedLimit),
  }
}
