const { app, closeServer } = require("./server")
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`)
})

process.on("SIGINT", () => {
  closeServer(server)
    .then(() => {
      process.exit(0)
    })
    .catch((err) => {
      console.error("Error during shutdown", err)
      process.exit(1)
    })
})

process.on("SIGTERM", () => {
  closeServer(server)
    .then(() => {
      process.exit(0)
    })
    .catch((err) => {
      console.error("Error during shutdown", err)
      process.exit(1)
    })
})
