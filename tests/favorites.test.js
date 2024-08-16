const app = require("./setupTests")
const request = require("supertest")

describe("Favorites API", () => {
  let agent

  describe("GET /favorites (noAuth)", () => {
    it("should redirect to login page when user is NOT logged in", async () => {
      const res = await request(app).get("/favorites")
      expect(res.status).toBe(302)
      expect(res.header.location).toBe("/login.html")
    })
  })

  describe("Authenticated Requests", () => {
    beforeEach(async () => {
      agent = request.agent(app)
      await agent.post("/login").send({ email: "taras", password: "123" })
    })

    describe("GET /favorites (withAuth)", () => {
      it("should return favorite page in html if user is logged in", async () => {
        const htmlPageRes = await agent.get("/favorites")
        expect(htmlPageRes.statusCode).toBe(200)
        expect(htmlPageRes.text.length).toBeGreaterThan(0)
      })
    })

    describe("GET /favorites/products (withAuth)", () => {
      it("should return list of products if user is logged in", async () => {
        const favProductsRes = await agent.get("/favorites/products")
        expect(favProductsRes.statusCode).toBe(200)
        expect(favProductsRes.body.result).toBeDefined()
        expect(favProductsRes.body.result.length).toBeGreaterThan(0)
      })
    })

    describe("DELETE /favorites/products (withAuth)", () => {
      it("should delete favorite product if user is logged in", async () => {
        const res = await agent
          .delete("/favorites/products")
          .send({ ProductID: "1" })
        expect(res.statusCode).toBe(200)

        const resSecond = await agent
          .delete("/favorites/products")
          .send({ ProductID: "1" })
        expect(resSecond.statusCode).toBe(404)
        expect(resSecond.body.errorMessage).toBe("No rows changed")
      })
    })

    describe("POST /favorites/products (withAuth)", () => {
      it("should add favorite product if user is logged in", async () => {
        const res = await agent
          .post("/favorites/products")
          .send({ ProductID: "1" })
        expect(res.statusCode).toBe(200)

        const resSecond = await agent
          .post("/favorites/products")
          .send({ ProductID: "1" })
        expect(resSecond.statusCode).toBe(404)
        expect(resSecond.body.errorMessage).toBe("such product already exist")
      })
    })
  })
})
