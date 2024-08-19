import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"
import { useLocation } from "react-router-dom"

function Products() {
  const { visibility: isOpenFilters, states } = useSelector(
    (store: storeType) => store.filters,
  )
  const { pathname } = useLocation()
  const gender = pathname.slice(1)
  const genders = []
  for (const genderName in states.gender) {
    if (states.gender[genderName as "men" | "women" | "children"]) {
      genders.push(genderName)
    }
  }
  let url = gender
  if (gender === "products") {
    url += `?${genders.map((gender) => `gender=${gender}`).join("&")}`
  }
  console.log(url)
  const { data } = useQuery({
    queryFn: () => {
      return ProductAPI.getProducts(url)
    },
    queryKey: [gender, url],
    suspense: true,
    staleTime: Infinity,
  }) as { data: ProductType[] }
  console.log(data)
  const filteredData = data
    .filter((product) => {
      if (states.price.length) {
        if (
          product.price >= states.price[0].min &&
          product.price <= states.price.at(-1)!.max!
        )
          return true
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
      if (!states.style.length) return true
      return states.style.includes(product.type)
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
