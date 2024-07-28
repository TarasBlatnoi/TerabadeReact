import { UserBodyType } from "../../types"
import { client } from "../instance"

class AuthAPI {
  async loginUser(body: UserBodyType) {
    const { data } = await client.post(`/login`, body)
    return data
  }

  async logoutUser() {
    const { data } = await client.get(`/logout`)
    return data
  }

  async checkAuth() {
    const { data } = await client.get(`/check-auth`)
    return data
  }
}

export default new AuthAPI()
