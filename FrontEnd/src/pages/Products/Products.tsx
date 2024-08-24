import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useLocation, useSearchParams } from "react-router-dom"
import { sortingOptions, useSort } from "../../context/SortContext"

function Products() {
  const { visibility: isOpenFilters, states } = useSelector(
    (store: storeType) => store.filters,
  )
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { productsSortMethod } = useSort()
  const gender = pathname.slice(1)
  const genders = []
  for (const genderName in states.gender) {
    if (states.gender[genderName as "men" | "women" | "children"]) {
      genders.push(genderName)
    }
  }
  let url = gender
  if (gender === "products") {
    url = ""
    if (genders.length) {
      url += `?${genders.map((gender) => `gender=${gender}`).join("&")}`
    }
  }
  const { data } = useQuery({
    queryFn: () => {
      return ProductAPI.getProducts(url)
    },
    queryKey: [gender, url],
    suspense: true,
    staleTime: Infinity,
  }) as { data: ProductType[] }

  const filteredData = data
    .filter((product) => {
      const [min, max] = ["min", "max"].map((queryParam) => {
        return (
          searchParams
            .get(queryParam)
            ?.split(",")
            .map((value) => +value)
            .sort((a, b) => a - b) || []
        )
      })

      if (min.length && max.length) {
        const inRange = Array.from({ length: min.length }, (_, index) => ({
          min: min[index],
          max: max[index],
        }))
          .map(({ min, max }) => product.price >= min && product.price <= max)
          .includes(true)
        if (inRange) return true
        else return false
      }
      return true
    })
    .filter((product) => {
      if (!Object.values(states.gender).includes(true)) return true
      const enabledGenderFilters = Object.entries(states.gender)
        .filter(([, checked]) => checked)
        .map(([gender]) => gender)
      return enabledGenderFilters.includes(product.sex)
    })
    .filter((product) => {
      const styles = searchParams.get("style")?.split(",") || []
      if (!styles.length) return true
      return styles.includes(product.type)
    })
    .filter((product) => {
      if (!states.size.length) return true
      const inRange = !!product.Sizes.filter((size: string) => {
        if (states.size.includes(+size)) return true
        else return false
      }).length

      if (inRange) return true
      else return false
    })
    .sort((a, b) => {
      switch (productsSortMethod) {
        case sortingOptions.standard:
          return -1
        case sortingOptions.priceAscending:
          return b.price - a.price
        case sortingOptions.priceDescending:
          return a.price - b.price
      }
    })

  return (
    <ul
      className={`${styles.cardList} ${
        !isOpenFilters ? styles.expandedList : ""
      }`}
    >
      {filteredData.map((product: ProductType) => {
        return <CardItem key={product.ProductID} product={product} />
      })}
    </ul>
  )
}

export default Products
