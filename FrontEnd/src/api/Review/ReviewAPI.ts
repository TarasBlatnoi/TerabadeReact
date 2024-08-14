import { Review } from "../../types"
import { client } from "../instance"

class ReviewAPI {
  async addReview(body: Review) {
    const { data } = await client.post(`/reviews`, body)
    return data
  }
}

export default new ReviewAPI()
