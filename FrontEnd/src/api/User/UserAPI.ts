import { UserBodyType } from "../../types"
import { client } from "../instance"

class UserAPI {
  async postUser(body: UserBodyType) {
    const { data } = await client.post(`/users`, body)
    return data
  }

  async patchUser(body: UserBodyType, id: string) {
    const { data } = await client.post(`/users/${id}`, body)
    return data
  }
  async registerUser(body: UserBodyType) {
    const { data } = await client.post("register", body)
    return data
  }
}

export default new UserAPI()
