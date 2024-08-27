import { useMutation, useQuery, useQueryClient } from "react-query"
import ProductAPI from "../../api/Product/ProductAPI"
import { ProductType } from "../../types"
import CardItem from "../../components/CardItem/CardItem"
import styles from "./Favorites.module.css"
import Button from "../../components/UI/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "../../components/UI/Modal/Modal"
import { formaterCurrency } from "../../components/CardItem/CardItem"
import Sizes from "../../components/Sizes/Sizes"
import { useCart } from "../../context/CartContext"
import Spinner from "../../components/LoadingSpinner/Spinner"

const Favorites = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [chosedSize, setChoseSize] = useState(0)
  const [addToCartClicked, setAddToCartClicked] = useState(false)
  const [chosenProduct, setChosenProduct] = useState<ProductType>(
    null as unknown as ProductType,
  )
  const { data, isLoading } = useQuery({
    queryFn: ProductAPI.getFavoriteProducts,
    queryKey: ["favorites"],
    staleTime: Infinity,
  }) as { data: { result: ProductType[] }; isLoading: boolean }

  const favProducts = data?.result
  const { addCartItem, openCart } = useCart()
  const [optimisticFav, setOptimisticFav] = useState(favProducts)

  useEffect(() => {
    setOptimisticFav(favProducts)
  }, [favProducts?.length])

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
            <CardItem
              key={product.ProductID}
              product={product}
              edit={edit}
              button={
                <Button
                  className={styles.pickSizeButton}
                  variant="secondary"
                  onClick={(event) => {
                    event.stopPropagation()
                    setChosenProduct(product)
                    setOpenModal(true)
                  }}
                  disabled={false}
                >
                  Обрати розмір
                </Button>
              }
            >
              <div
                onClick={(ev) => {
                  handleDeleteFavorite(product.ProductID)
                  ev.stopPropagation()
                }}
                className={styles.heart}
              ></div>
            </CardItem>
          )
        })}
        <Modal
          open={openModal}
          className={`${styles.modal}`}
          addTransition={styles.transformCenter}
          closeModal={() => {
            setChoseSize(0)
            setOpenModal(false)
          }}
        >
          <div className={styles.choseSizeWrapper}>
            {chosenProduct && (
              <>
                <img
                  src={chosenProduct.ImageURL}
                  alt="chosenProduct?.name"
                  className={styles.choseSizeImg}
                />
                <div className={styles.textWrapper}>
                  <h2 className={styles.sexText}>{chosenProduct.sex}</h2>
                  <h1 className={styles.name}>{chosenProduct.name}</h1>
                  <p className={styles.price}>
                    UAH
                    {` ${formaterCurrency.format(chosenProduct.price)}`}
                  </p>
                  <div className={styles.selectSize}>
                    <Sizes
                      begin={6}
                      end={14}
                      step={0.5}
                      gridLayout={{
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                      }}
                      sizeRect={styles.sizeRect}
                      sizeRectFilled={styles.sizeRectFilled}
                      sizeNotAvailable={styles.sizeNotAvailable}
                      chosedSize={chosedSize}
                      setChoseSize={setChoseSize}
                      addToCartClicked={addToCartClicked}
                      sizes={chosenProduct.Sizes.map((size) => ({
                        SizeLabel: size,
                        InStock: 1,
                      }))}
                    />
                  </div>
                  <Button
                    className={styles.addToCart}
                    variant="secondary"
                    onClick={() => {
                      setAddToCartClicked(true)
                      if (!chosedSize) return
                      addCartItem({
                        id: `${chosenProduct.ProductID}`,
                        name: chosenProduct.name,
                        image: chosenProduct.ImageURL,
                        price: chosenProduct.price,
                        sex: chosenProduct.sex,
                        size: chosedSize,
                        type: chosenProduct.type,
                      })
                      setOpenModal(false)
                      openCart()
                    }}
                  >
                    Додати в кошик
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </ul>
    )
  }

  return (
    <>
      {isLoading && <Spinner />}
      {optimisticFav?.length && (
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
      )}
      {!isLoading && !optimisticFav?.length && (
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
