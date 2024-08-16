import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { useSelector } from "react-redux"
import { storeType } from "../../store/store"

type ProductsPropsType = {
  parentRouteId: "men" | "women" | "children"
}

function Products({ parentRouteId }: ProductsPropsType) {
  const { data, error } = useQuery({
    queryFn: () => ProductAPI.getProducts(parentRouteId),
    queryKey: [parentRouteId],
    suspense: true,
    staleTime: Infinity,
  }) as { data: ProductType[] }
  console.log(data, error)
  const { visibility: isOpenFilters, states } = useSelector(
    (store: storeType) => store.filters,
  )

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
