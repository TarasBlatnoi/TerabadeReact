const imageToBase64 = (result) => {
  if (!Array.isArray(result)) return result
  if (result.length && result[0].hasOwnProperty("image")) {
    for (const product of result) {
      const imageBase64 = Buffer.from(product.image).toString("base64")
      product.image = imageBase64
    }
  }
  return result
}

module.exports = { imageToBase64 }
