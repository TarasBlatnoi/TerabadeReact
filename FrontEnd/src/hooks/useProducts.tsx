import { useEffect, useMemo, useState } from "react"
import { useFetchedData } from "./useFetchedData"
import { ProductType } from "../types"
import ProductAPI from "../api/Product/ProductAPI"
import { useSearchParams } from "react-router-dom"

interface ScrollingData {
  response: ProductType[]
}

export function useProducts() {
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scrollingData, setScrollingData] = useState<ScrollingData>({
    response: [],
  })
  const [searchParams] = useSearchParams()

  const gendersQuery = searchParams.get("gender")?.split(",")
  const gendersQueryStr = gendersQuery?.join(" ")

  const genderKeys = useMemo(() => {
    return gendersQuery?.length ? gendersQuery : ["products"]
  }, [gendersQueryStr])

  let url = ""
  if (!gendersQuery) url = ""
  else if (gendersQuery) {
    url += "?"
    if (gendersQuery.length === 1) url += "gender=" + gendersQuery[0] + "&"
    else
      url += gendersQuery.reduce((acc, val) => acc + "gender=" + val + "&", "")
  }
  const pagingQueries = `limit=9&page=${pageNumber}`

  url += url?.includes("?") ? pagingQueries : "?" + pagingQueries

  const { data, isLoading } = useFetchedData(
    () => ProductAPI.getProducts(url),
    ...genderKeys,
    pageNumber,
  )

  useEffect(() => {
    setPageNumber(1)
    setHasMore(false)
    setScrollingData({ response: [] })
  }, [genderKeys])

  useEffect(() => {
    if (data) {
      setScrollingData((prevData) => {
        return {
          ...data,
          response: [
            ...new Set([
              ...prevData.response.filter((product) =>
                genderKeys[0] === "products"
                  ? true
                  : genderKeys.includes(product.sex),
              ),
              ...data.response,
            ]),
          ],
        }
      })
      if (data.next) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    }
  }, [data])

  return {
    isLoading,
    scrollingData,
    hasMore,
    setHasMore,
    setPageNumber,
    searchParams,
    pageNumber,
  }
}
