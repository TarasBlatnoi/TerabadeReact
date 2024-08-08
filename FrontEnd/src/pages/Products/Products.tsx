import { Await, useRouteLoaderData } from "react-router-dom"
import { AxiosResponse } from "axios"
import React from "react"
import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useFilters } from "../../context/FiltersContext"

type ProductsPropsType = {
  parentRouteId: string
}

function Products({ parentRouteId }: ProductsPropsType) {
  const { data } = useRouteLoaderData(parentRouteId) as {
    data: AxiosResponse<ProductType[]>
  }
  const { isOpenFilters } = useFilters()

  return (
    <React.Suspense fallback={<h1>loading...</h1>}>
      <Await resolve={data}>
        {(data: ProductType[]) => {
          return (
            <ul
              className={`${styles.cardList} ${
                !isOpenFilters ? styles.expandedList : ""
              }`}
            >
              {data.map((product: ProductType) => {
                return <CardItem key={product.ProductID} product={product} />
              })}
            </ul>
          )
        }}
      </Await>
    </React.Suspense>
  )
}

export default Products
