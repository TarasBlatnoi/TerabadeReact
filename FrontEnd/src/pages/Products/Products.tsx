import CardItem from "../../components/CardItem/CardItem"
import { ProductType } from "../../types"
import styles from "./Products.module.css"
import { useFilters } from "../../context/FiltersContext"
import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"

type ProductsPropsType = {
  parentRouteId: "men" | "women" | "children"
}

function Products({ parentRouteId }: ProductsPropsType) {
  const { data } = useQuery({
    queryFn: () => ProductAPI.getProducts(parentRouteId),
    queryKey: [parentRouteId],
    suspense: true,
    staleTime: Infinity,
  })

  const { isOpenFilters } = useFilters()

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
}

export default Products
