import { useMutation, useQuery, useQueryClient } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Favorites.module.css"
import Button from "../../components/UI/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Favorites = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const { data } = useQuery({
    queryFn: ProductAPI.getFavoriteProducts,
    queryKey: ["favorites"],
    suspense: true,
  }) as { data: { result: ProductType[] } }

  const favProducts = data?.result

  const [optimisticFav, setOptimisticFav] = useState(favProducts)

  useEffect(() => {
    setOptimisticFav(favProducts)
  }, [favProducts.length])

  const { mutate } = useMutation({
    mutationFn: ProductAPI.deleteFavoriteProduct,
    onSuccess() {
      queryClient.invalidateQueries(["favorites"])
    },
    onError() {
      setOptimisticFav(favProducts)
    },
  })
  function handleDeleteFavorite(id: number) {
    setOptimisticFav((curr) =>
      curr.filter((product) => product.ProductID !== id),
    )
    mutate(id)
  }
  let content
  if (optimisticFav) {
    content = (
      <ul className={styles.cardList}>
        {optimisticFav.map((product: ProductType) => {
          return (
            <CardItem key={product.ProductID} product={product} edit={edit}>
              <div
                style={{ position: "absolute" }}
                onClick={() => handleDeleteFavorite(product.ProductID)}
              >
                <button>Delete</button>
              </div>
            </CardItem>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      {optimisticFav?.length ? (
        <div className={styles.favContainer}>
          <div className={styles.editContainer}>
            <h1>{!edit ? "Ваші улюблені" : "Редагувати улюблені"}</h1>
            <button
              className={styles.editButtn}
              onClick={() => setEdit((curr) => !curr)}
            >
              {edit ? "Готово" : `Редагувати`}
            </button>
          </div>
          {content}
        </div>
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
