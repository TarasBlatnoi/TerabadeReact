import ProductAPI from "../../api/Product/ProductAPI"
import {
  Await,
  defer,
  Form,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom"
import { ProductType } from "../../types"
import { CartContext } from "../../context/CartContext"
import { Suspense, useContext } from "react"
import { CartItemType } from "../../context/CartContext"
import CardItem from "../../components/CardItem/CardItem"
import { AxiosResponse } from "axios"
import goBackImg from "../../assets/images/back-svgrepo-com 1.svg"
import styles from "./DetailProducts.module.css"
import Button from "../../components/UI/Button/Button"
import Star from "../../assets/images/star-fall-minimalistic-svgrepo-com 1.svg"
import CharacteristicsImg from "../../assets/images/list-minus-svgrepo-com 1.svg"

export function loader({ params }: LoaderFunctionArgs) {
  return defer({ data: ProductAPI.getById(params.id!) })
}
type DetailProductProps = {
  parentRouteId: string
}

function DetailProduct({ parentRouteId }: DetailProductProps) {
  const { data } = useLoaderData() as { data: AxiosResponse<ProductType[]> }
  const { data: parentData } = useRouteLoaderData(parentRouteId) as {
    data: AxiosResponse<ProductType[]>
  }
  const { addCartItem, openCart } = useContext(CartContext)
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Await resolve={data}>
        {(data) => {
          const detailProduct = data[0] as ProductType
          return (
            <>
              <div className={styles.goBack}>
                <Link to="../" className={styles.goBackLink}>
                  <img
                    src={goBackImg}
                    alt="go back"
                    className={styles.goBackImg}
                  />
                  <p className={styles.goBackText}>Повернутись</p>
                </Link>
              </div>
              <section>
                <div className={styles.productGrid}>
                  <div className={styles.productImagesContainer}>
                    <div className={styles.smallImages}>
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                      <img
                        src={`${detailProduct.image}`}
                        alt={detailProduct.name}
                        className={styles.smallImage}
                      />
                    </div>
                    <img
                      src={`${detailProduct.image}`}
                      alt={detailProduct.name}
                      className={styles.mainImage}
                    />
                  </div>

                  <div className={styles.productText}>
                    <h2 className={styles.productName}>{detailProduct.name}</h2>
                    <h3 className={styles.productType}>{detailProduct.type}</h3>
                    <p className={styles.productPrice}>
                      <span className={styles.productPriceNumber}>
                        {detailProduct.price}
                      </span>{" "}
                      UAH
                    </p>
                    <div className={styles.sizesContainer}>
                      <div className={styles.sizesTextConteiner}>
                        <p>Обрати розмір</p>
                        <p>Довідник розмірів</p>
                      </div>
                      <div className={styles.sizeRectContainer}>
                        <div className={styles.sizeRect}>6</div>
                        <div className={styles.sizeRect}>6.5</div>
                        <div className={styles.sizeRect}>7</div>
                        <div className={styles.sizeRect}>7.5</div>
                        <div
                          className={`${styles.sizeRect} ${styles.sizeRectFilled}`}
                        >
                          8
                        </div>
                        <div className={styles.sizeRect}>8.5</div>
                        <div className={styles.sizeRect}>9</div>
                        <div className={styles.sizeRect}>9.5</div>
                        <div className={styles.sizeRect}>10</div>
                        <div className={styles.sizeRect}>10.5</div>
                        <div className={styles.sizeRect}>11</div>
                        <div className={styles.sizeRect}>11.5</div>
                        <div className={styles.sizeRect}>12</div>
                        <div className={styles.sizeRect}>12.5</div>
                        <div className={styles.sizeRect}>13</div>
                        <div className={styles.sizeRect}>13.5</div>
                        <div className={styles.sizeRect}>14</div>
                      </div>
                    </div>
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
                      <Button
                        className={styles.addToFavButton}
                        variant="secondaryDark"
                      >
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
                      {detailProduct.productDetails} also this is just a
                      PLACEHOLDER SO DON'T pay attention to it maybe once we
                      will add some more data to db that will make some sense
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam doloribus adipisci voluptates facere animi magnam,
                      quis aliquam reprehenderit recusandae, deserunt, suscipit
                      ex temporibus impedit hic molestias tempore placeat fugiat
                      dolores.
                    </p>
                    <p className={styles.readMore}>Читати більше</p>
                    <div className={styles.characteristicsContainer}>
                      <img
                        src={CharacteristicsImg}
                        alt="characteristics icon"
                        className={styles.characteristicsIcon}
                      />
                      <h2 className={styles.characteristicsTitle}>
                        Характеристики
                      </h2>
                    </div>
                    <p className={styles.characteristics}>
                      {detailProduct.type} Lorem ipsum dolor sit, amet
                      consectetur adipisicing elit. Accusantium dolorem
                      cupiditate maxime excepturi expedita provident tenetur
                      aliquid sapiente praesentium, officiis ab, ullam
                      consectetur nobis quae neque odio dolores et dolor.
                    </p>
                    <p className={styles.showAll}>Показати всі</p>
                    <Form action="">
                      <div className={styles.reviewContainer}>
                        <textarea
                          name="Напишіть відгук ..."
                          id="responseTextArea"
                          placeholder="Напишіть відгук..."
                        ></textarea>
                        <Button
                          variant="secondaryDark"
                          type="submit"
                          className={styles.buttonSubmitReview}
                        >
                          Надіслати
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </section>
              <div className={styles.recommendedProducts}>
                <Suspense fallback={<h1>loading parent data</h1>}>
                  <Await resolve={parentData}>
                    {(products: ProductType[]) => {
                      return (
                        <ul className={styles.recommendedProductsUl}>
                          {products
                            .filter(
                              (product) =>
                                product.ProductID !== detailProduct.ProductID
                            )
                            .map((product) => {
                              return (
                                <CardItem
                                  product={product}
                                  key={product.ProductID}
                                />
                              )
                            })}
                        </ul>
                      )
                    }}
                  </Await>
                </Suspense>
              </div>
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default DetailProduct
