import { useLoaderData } from "react-router-dom"
import ProductAPI from "../api/Product/ProductAPI"
import { ProductType } from "../types/Product"

export function loader(): Promise<ProductType[]> {
  return ProductAPI.getMenProducts()
}

const Men = () => {
  const menProducts = useLoaderData() as ProductType[]

  return (
    <div>
      {menProducts.map((product: ProductType) => {
        return <h1>{product.name}</h1>
      })}
    </div>
  )
}

export default Men
