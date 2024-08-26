import { FavProductBodyType } from "../../types"
import { client } from "../instance"

class ProductAPI {
  async getAll() {
    const { data } = await client.get(`/products`)
    return data
  }

  async getProducts(parentRoute: string) {
    const res = await client.get(`/products/${parentRoute}`)
    if (res.status !== 200) throw new Error("some error has occured")
    return res.data
  }
  async getMenProducts() {
    const { data } = await client.get(`/products/men`)
    return data
  }
  async getWomenProducts() {
    const { data } = await client.get("/products/women")
    return data
  }
  async getChildrenProducts() {
    const { data } = await client.get("/products/children")
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

  async addProductToFavorite(body: FavProductBodyType) {
    const res = await client.post(`/favorites`, body, {
      validateStatus: function (status) {
        return status >= 200 && status < 400
      },
    })
    return res
  }

  async deleteFavoriteProduct(id: number) {
    const res = await client.delete(`/favorites/${id}`)
    return res
  }
}

export default new ProductAPI()
