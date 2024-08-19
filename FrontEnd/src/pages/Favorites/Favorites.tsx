import { useQuery } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Favorites.module.css"
import Button from "../../components/UI/Button/Button"
import { useNavigate } from "react-router-dom"

const Favorites = () => {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryFn: ProductAPI.getFavoriteProducts,
    queryKey: ["products", "favorites"],
    suspense: true,
  })

  let content
  const favProducts = data?.result
  if (data) {
    content = (
      <ul className={styles.cardList}>
        {favProducts.map((product: ProductType) => {
          return <CardItem key={product.ProductID} product={product} />
        })}
      </ul>
    )
  }
  return (
    <>
      {favProducts?.length ? (
        content
      ) : (
        <div className={styles.container}>
          <h1 className={styles.favProductsFallback}>
            Ще нічого не додано до улюблених. Переглянь наші новинки!
          </h1>
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate("/sale")}
          >
            Переглянути новинки
          </Button>
        </div>
      )}
    </>
  )
}

export default Favorites
