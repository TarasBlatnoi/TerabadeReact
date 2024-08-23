import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useLocation } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"

// Define the type for the state
interface ScrollingData {
  response: ProductType[]
}
import { sortingOptions, useSort } from "../../context/SortContext"

function Products() {
  const { visibility: isOpenFilters, states } = useSelector(
    (store: storeType) => store.filters,
  )
  const { pathname } = useLocation()
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scrollingData, setScrollingData] = useState<ScrollingData>({
    response: [],
  })

  const observer = useRef<IntersectionObserver | null>(null)

  // Generate URL based on filters and page number
  const { productsSortMethod } = useSort()
  const gender = pathname.slice(1)
  const genders = []
  for (const genderName in states.gender) {
    if (states.gender[genderName as "men" | "women" | "children"]) {
      genders.push(genderName)
    }
  }

  let url = gender
  const pagingQueries = `limit=9&page=${pageNumber}`
  if (gender === "products") {
    url = ""
    if (genders.length) {
      url += `?${genders.map((gender) => `gender=${gender}`).join("&")}`
    }
  }
  url += url.includes("?") ? `&${pagingQueries}` : `?${pagingQueries}`

  const { data, isLoading } = useQuery({
    queryFn: () => ProductAPI.getProducts(url),
    queryKey: [gender, pageNumber],
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      setScrollingData((prevData) => ({
        ...data,
        response: [...prevData.response, ...data.response],
      }))

      if (data.next) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    }
  }, [data])

  const lastProductElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [hasMore, isLoading],
  )

  return (
    <ul
      className={`${styles.cardList} ${
        !isOpenFilters ? styles.expandedList : ""
      }`}
    >
      {scrollingData.response.map((product: ProductType, index: number) => {
        if (scrollingData.response.length - 1 === index) {
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
