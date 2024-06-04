// test/integration/users.test.js
const app = require("./setupTests")
const request = require("supertest")

describe("Users API", () => {
  describe("GET /api/v1/users/:id", () => {
    it("should redirect because user not logged in", async () => {
      const res = await request(app).get("/api/v1/users/13")
      expect(res.statusCode).toBe(302)
    })
  })
})
