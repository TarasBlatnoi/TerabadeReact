import { defer } from "react-router-dom"
import ProductAPI from "../../api/Product/ProductAPI"

export function womenLoader() {
  return defer({ data: ProductAPI.getWomenProducts() })
}

export function childrenLoader() {
  return defer({ data: ProductAPI.getChildrenProducts() })
}

export function menLoader() {
  return defer({ data: ProductAPI.getMenProducts() })
}
