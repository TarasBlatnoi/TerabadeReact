import { useLoaderData } from "react-router-dom"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Men.module.css"

export function loader(): Promise<ProductType[]> {
  return ProductAPI.getMenProducts()
}

const Men = () => {
  const menProducts = useLoaderData() as ProductType[]

  return (
    <div className={styles.products}>
      {menProducts.map((product: ProductType) => {
        return <CardItem key={product.ProductID} product={product} />
      })}
    </div>
  )
}

export default Men
