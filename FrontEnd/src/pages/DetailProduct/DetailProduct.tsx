import ProductAPI from "../../api/Product/ProductAPI"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { useContext, useEffect, useRef, useState } from "react"
import { CartItemType } from "../../context/CartContext"
import goBackImg from "../../assets/images/back-svgrepo-com 1.svg"
import styles from "./DetailProducts.module.css"
import Button from "../../components/UI/Button/Button"
import Star from "../../assets/images/star-fall-minimalistic-svgrepo-com 1.svg"
import CharacteristicsImg from "../../assets/images/list-minus-svgrepo-com 1.svg"
import { useQuery } from "react-query"
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike"
import { useMutation } from "react-query"
import ReviewAPI from "../../api/Review/ReviewAPI"
import ReviewForm from "../../components/ReviewForm/ReviewFrom"
import { isAxiosError } from "axios"
import Sizes from "./Sizes/Sizes"
import ImagesContainer from "./ImagesContainer/ImagesContainer"
import { useImages } from "../../context/ImageContext"
import FavoriteButtons from "./FavoriteButtons/FavoriteButtons"

function DetailProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [reviewSent, setReviewSent] = useState(false)
  const { setActiveImage } = useImages()

  const {
    data: [detailProduct],
  } = useQuery({
    queryFn: () => ProductAPI.getById(params.id!),
    queryKey: [params.id],
    staleTime: Infinity,
    suspense: true,
  })
  useEffect(() => {
    setActiveImage(
      detailProduct?.images[0]?.ImageURL || "https://picsum.photos/200",
    )
  }, [setActiveImage, detailProduct])
  const { data: parentData } = useQuery({
    queryFn: () => ProductAPI.getProducts(detailProduct.sex),
    queryKey: [detailProduct.sex],
    staleTime: Infinity,
    suspense: true,
  })
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: ReviewAPI.addReview,
    onSuccess: () => {
      if (textAreaRef.current) {
        textAreaRef.current.value = ""
      }
      setReviewSent(true)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 300) {
          navigate("/login")
        }
      }
    },
  })
  function handleSubmit(reviewText: string) {
    mutate({ text: reviewText, ProductID: detailProduct.ProductID })
  }
  const { addCartItem, openCart } = useContext(CartContext)
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }
  return (
    <>
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
              </span>{" "}
              UAH
            </p>
            <Sizes begin={6} end={14} step={0.5} />
            <div className={styles.actionButtons}>
              <Button
                className={styles.addToCartButton}
                variant="secondary"
                onClick={() => {
                  handleClick({
                    id: `${detailProduct.ProductID}`,
                    name: detailProduct.name,
                    image: detailProduct.image,
                    price: detailProduct.price,
                  })
                  openCart()
                }}
              >
                Додати в кошик
              </Button>
              <FavoriteButtons ProductID={detailProduct.ProductID} />
            </div>
            <div className={styles.descriptionTitleContainer}>
              <img src={Star} alt="star" className={styles.star} />
              <h2>Опис</h2>
            </div>
            <p className={styles.details}>
              {detailProduct.productDetails} also this is just a PLACEHOLDER SO
              DON'T pay attention to it maybe once we will add some more data to
              db that will make some sense Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ipsam doloribus adipisci voluptates
              facere animi magnam, quis aliquam reprehenderit recusandae,
              deserunt, suscipit ex temporibus impedit hic molestias tempore
              placeat fugiat dolores.
            </p>
            <p className={styles.readMore}>Читати більше</p>
            <div className={styles.characteristicsContainer}>
              <img
                src={CharacteristicsImg}
                alt="characteristics icon"
                className={styles.characteristicsIcon}
              />
              <h2 className={styles.characteristicsTitle}>Характеристики</h2>
            </div>
            <p className={styles.characteristics}>
              {detailProduct.type} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Accusantium dolorem cupiditate maxime excepturi
              expedita provident tenetur aliquid sapiente praesentium, officiis
              ab, ullam consectetur nobis quae neque odio dolores et dolor.
            </p>
            <p className={styles.showAll}>Показати всі</p>
            <ReviewForm handleSubmit={handleSubmit}>
              <div className={styles.reviewContainer}>
                <textarea
                  name="text"
                  ref={textAreaRef}
                  id="responseTextArea"
                  placeholder="Напишіть відгук..."
                ></textarea>
                {isLoading && <p>Відгук надсилається</p>}
                {!isLoading && (
                  <Button
                    variant="secondaryDark"
                    type="submit"
                    className={styles.buttonSubmitReview}
                  >
                    Надіслати
                  </Button>
                )}
                {isError && <p>Щось пішло не так</p>}
                {reviewSent && <p>Ваш відгук надіслано</p>}
              </div>
            </ReviewForm>
          </div>
        </div>
      </section>
      <YouMightAlsoLike products={parentData} />
    </>
  )
}

export default DetailProduct
