import { Await, defer, useLoaderData } from "react-router-dom"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Men.module.css"
import { Suspense } from "react"

async function loadMenProducts() {
  return ProductAPI.getMenProducts()
}

export function loader() {
  return defer({ menProducts: loadMenProducts() })
}

interface ProductsPromiseType {
  menProducts: Promise<ProductType[]>
}

const Men = () => {
  const menProductsPromise = useLoaderData() as ProductsPromiseType
  return (
    <>
      <h1>filter</h1>
      <p>toggle filter</p>
      <Suspense fallback={<h1>Loading products...</h1>}>
        <Await resolve={menProductsPromise.menProducts}>
          {(menProducts) => {
            return (
              <div className={styles.products}>
                {menProducts.map((product: ProductType) => {
                  return <CardItem key={product.ProductID} product={product} />
                })}
              </div>
            )
          }}
        </Await>
      </Suspense>
    </>
  )
}

export default Men
