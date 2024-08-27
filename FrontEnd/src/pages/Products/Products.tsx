import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useProducts } from "../../hooks/useProducts"
import { useIntersection } from "../../hooks/useIntersection"
import { useFilteredData } from "../../hooks/useFilteredData"
import { useProductsCount } from "../../context/ProductsContext"
import { useEffect } from "react"

function Products() {
  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility,
  )
  const { setProductsAmount } = useProductsCount()

  const { isLoading, scrollingData, hasMore, setPageNumber } = useProducts()

  useEffect(() => {
    setProductsAmount(scrollingData?.totalResults || 0)
  }, [scrollingData?.totalResults])

  const { lastProductElementRef } = useIntersection({
    isLoading,
    hasMore,
    setPageNumber,
  })

  const { filteredData } = useFilteredData(scrollingData.response)

  return (
    <ul
      className={`${styles.cardList} ${
        !isOpenFilters ? styles.expandedList : ""
      }`}
    >
      {filteredData.map((product: ProductType, index: number) => {
        if (filteredData.length - 1 === index) {
          return (
            <CardItem
              key={product.ProductID}
              ref={lastProductElementRef}
              product={product}
            />
          )
        }
        return <CardItem key={product.ProductID} product={product} />
      })}
      {isLoading && <div>Loading...</div>}
    </ul>
  )
}

export default Products
