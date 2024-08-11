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
  const { data } = useQuery({
    queryFn: () => ProductAPI.getProducts(parentRouteId),
    queryKey: [parentRouteId],
    suspense: true,
    staleTime: Infinity,
  })

  const isOpenFilters = useSelector(
    (store: storeType) => store.filters.visibility
  )

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
