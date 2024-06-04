const bcrypt = require("bcryptjs")
//const verifyPassword = require("./verifyPassword")

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(16)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    console.error("Error hashing password:", error)
    throw error
  }
}
// hashPassword("taras").then((password) => {
//   verifyPassword("taras", password).then((res) => {
//     console.log(res)
//   })
// })

module.exports = hashPassword
