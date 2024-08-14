import ProductAPI from "../../api/Product/ProductAPI"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { useContext, useRef, useState } from "react"
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

function DetailProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [reviewSent, setReviewSent] = useState(false)
  const {
    data: [detailProduct],
  } = useQuery({
    queryFn: () => ProductAPI.getById(params.id!),
    queryKey: [params.id],
    staleTime: Infinity,
    suspense: true,
  })
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
              <Button className={styles.addToFavButton} variant="secondaryDark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#F9C31F"
                >
                  <path d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
                </svg>
              </Button>
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
