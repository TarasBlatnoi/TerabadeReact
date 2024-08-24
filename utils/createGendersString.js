exports.createGenderFilterString = (path, gendersQuery) => {
  if (path !== "/") {
    return `"${path.slice(1)}"`
  } else {
    if (Array.isArray(gendersQuery) && gendersQuery.length) {
      return gendersQuery
        .reduce((acc, cur) => acc + ` "${cur}",`, "")
        .slice(1, -1)
    }
    if (gendersQuery) return `"${gendersQuery}"`
    return `"men", "women", "children"`
  }
}
