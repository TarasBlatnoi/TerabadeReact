const bcrypt = require("bcryptjs")

async function verifyPassword(inputPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword)
    return isMatch
  } catch (error) {
    console.error("Error verifying password:", error)
    throw error
  }
}
module.exports = verifyPassword
