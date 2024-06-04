const app = require("./setupTests")
const request = require("supertest")
//const db = require("../BackEnd/database")

describe("POST /register when user exists", () => {
  it("should add user to db", async () => {
    const resSecond = await request(app)
      .post("/register")
      .send({ email: "taras", password: "123" })
    expect(resSecond.statusCode).toBe(404)
    expect(resSecond.body.errorMessage).toBe("User with that mail exists")
  })
})
