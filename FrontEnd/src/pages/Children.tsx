import { Await, defer, useLoaderData } from "react-router-dom"
import ProductAPI from "../api/Product/ProductAPI"
import { AxiosResponse } from "axios"
import React from "react"
import CardItem from "../components/CardItem/CardItem"
import { ProductType } from "../types"

export function loader() {
  return defer({ data: ProductAPI.getChildrenProducts() })
}

function Children() {
  const { data } = useLoaderData() as { data: AxiosResponse<ProductType[]> }

  return (
    <React.Suspense fallback={<h1>loading...</h1>}>
      <Await resolve={data}>
        {(data: ProductType[]) => {
          console.log(data)
          return data.map((product: ProductType) => {
            return <CardItem key={product.ProductID} product={product} />
          })
        }}
      </Await>
    </React.Suspense>
  )
}
export default Children
