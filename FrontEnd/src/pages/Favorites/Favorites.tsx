import { useQuery } from "@tanstack/react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Favorites.module.css"

const Favorites = () => {
  const { data, isPending, isError, error } = useQuery({
    queryFn: ProductAPI.getFavoriteProducts,
    queryKey: ["products", "favorites"],
  })

  let content
  if (isPending) {
    content = <h2>Fetching your favorite products...</h2>
  }
  if (isError) {
    console.log(error)
    content = <p>Error</p>
  }
  if (data) {
    const favProducts = data.result
    content = (
      <div className={styles.products}>
        {favProducts.map((product: ProductType) => {
          return <CardItem key={product.ProductID} product={product} />
        })}
      </div>
    )
  }
  return (
    <div>
      <h1>filter</h1>
      <p>toggle filter</p>
      {content}
    </div>
  )
}

export default Favorites
