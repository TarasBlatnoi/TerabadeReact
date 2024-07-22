import { UserBodyType } from "../../types"
import { client } from "../instance"

class AuthAPI {
  async loginUser(body: UserBodyType) {
    const { data } = await client.post(`/login`, body)
    return data
  }
}

export default new AuthAPI()
