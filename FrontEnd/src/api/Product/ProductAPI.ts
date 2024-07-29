import { client } from "../instance"

class ProductAPI {
  async getAll() {
    const { data } = await client.get(`/products`)
    return data
  }

  async getMenProducts() {
    const { data } = await client.get(`/products/men`)
    return data
  }

  async getById(id: string) {
    const { data } = await client.get(`/products/${id}`)
    return data
  }

  async getFavoriteProducts() {
    const { data } = await client.get(`/favorites`)
    return data
  }
}

export default new ProductAPI()
