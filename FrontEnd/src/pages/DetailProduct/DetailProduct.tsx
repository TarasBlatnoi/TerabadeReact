import ProductAPI from "../../api/Product/ProductAPI"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useEffect, useState } from "react"
import { CartItemType } from "../../context/CartContext"
import goBackImg from "../../assets/images/back-svgrepo-com 1.svg"
import styles from "./DetailProducts.module.css"
import Button from "../../components/UI/Button/Button"
import { useQuery } from "react-query"
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"
import Sizes from "../../components/Sizes/Sizes"
import ImagesContainer from "./ImagesContainer/ImagesContainer"
import { useImages } from "../../context/ImageContext"
import FavoriteButtons from "./FavoriteButtons/FavoriteButtons"
import useDetailedProduct from "../../hooks/useDetailedProduct"
import DetailsReadMore from "./DetailsReadMore/DetailsReadMore"
import CharacteristicsReadAll from "./CharacteristicsReadAll/CharacteristicsReadAll"
import ReviewForm from "./ReviewForm/ReviewForm"

function DetailProduct() {
  const [chosedSize, setChoseSize] = useState(0)
  const [addToCartClicked, setAddToCartClicked] = useState(false)
  const { setActiveImage } = useImages()
  const detailProduct = useDetailedProduct()

  useEffect(() => {
    setActiveImage(
      detailProduct?.images[0]?.ImageURL || "https://picsum.photos/200",
    )
  }, [setActiveImage, detailProduct])

  const { data: parentData } = useQuery({
    queryFn: () => ProductAPI.getProducts(detailProduct.sex),
    queryKey: [detailProduct.sex],
    staleTime: Infinity,
  })

  const { addCartItem, openCart } = useCart()
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }
  return (
    <div className={styles.container}>
      <div className={styles.goBack}>
        <Link to={`../${detailProduct.sex}`} className={styles.goBackLink}>
          <img src={goBackImg} alt="go back" className={styles.goBackImg} />
          <p className={styles.goBackText}>Повернутись</p>
        </Link>
      </div>
      <section>
        <div className={styles.productGrid}>
          <ImagesContainer detailProduct={detailProduct} />
          <div className={styles.productText}>
            <h2 className={styles.productName}>{detailProduct.name}</h2>
            <h3 className={styles.productType}>{detailProduct.type}</h3>
            <p className={styles.productPrice}>
              <span className={styles.productPriceNumber}>
                {detailProduct.price}
              </span>
              UAH
            </p>
            <Sizes
              begin={6}
              end={14}
              step={0.5}
              sizeRect={styles.sizeRect}
              sizeRectFilled={styles.sizeRectFilled}
              chosedSize={chosedSize}
              setChoseSize={setChoseSize}
              addToCartClicked={addToCartClicked}
              sizeNotAvailable={styles.sizeNotAvailable}
              sizes={detailProduct.sizes}
            />
            <div className={styles.actionButtons}>
              <Button
                className={styles.addToCartButton}
                variant="secondary"
                onClick={() => {
                  setAddToCartClicked(true)
                  if (!chosedSize) return
                  handleClick({
                    id: `${detailProduct.ProductID}`,
                    name: detailProduct.name,
                    image: detailProduct.images[0].ImageURL,
                    price: detailProduct.price,
                    sex: detailProduct.sex,
                    size: chosedSize,
                    type: detailProduct.type,
                  })
                  openCart()
                }}
              >
                Додати в кошик
              </Button>
              <FavoriteButtons ProductID={detailProduct.ProductID} />
            </div>
            <DetailsReadMore text={detailProduct.productDetails} />
            <CharacteristicsReadAll text={detailProduct.type} />
            <ReviewForm ProductID={detailProduct.ProductID} />
          </div>
        </div>
      </section>
      <YouMightAlsoLike products={parentData.response} />
    </div>
  )
}

export default DetailProduct
