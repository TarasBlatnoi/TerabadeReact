import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Favorites.module.css"

const Favorites = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: ProductAPI.getFavoriteProducts,
    queryKey: ["products", "favorites"],
  })

  let content
  if (isLoading) {
    content = <h2>Fetching your favorite products...</h2>
  }
  if (isError) {
    console.log(error)
    content = <p>Error</p>
  }
  const favProducts = data?.result
  if (data) {
    content = (
      <div className={styles.products}>
        {favProducts.map((product: ProductType) => {
          return <CardItem key={product.ProductID} product={product} />
        })}
      </div>
    )
  }
  return (
    <>
      {favProducts?.length ? (
        content
      ) : (
        <h1 className={styles.favProductsFallback}>
          You didn't add any products yet
        </h1>
      )}
    </>
  )
}

export default Favorites
