import { useSearchParams } from "react-router-dom"
import { useSort } from "../context/SortContext"
import { ProductType } from "../types"
import { Products } from "../utils/ProductsFilters"

export function useFilteredData(data: ProductType[]) {
  const { productsSortMethod } = useSort()
  const [searchParams] = useSearchParams()

  const products = new Products(data, searchParams)

  const filteredData = products
    .filteByPrice()
    .filterBySize()
    .filterByStyle()
    .sortByPrice(productsSortMethod).data

  return { filteredData }
}
