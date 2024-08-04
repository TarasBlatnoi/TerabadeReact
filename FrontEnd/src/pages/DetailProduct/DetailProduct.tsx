import ProductAPI from "../../api/Product/ProductAPI"
import {
  Await,
  defer,
  json,
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

interface ProductsPromiseType {
  menProducts: Promise<ProductType[]>
}

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
              <Link to="../men">
                <h3 style={{ color: "red" }}>
                  <span>&larr;</span>
                </h3>
              </Link>
              <h2>{detailProduct.name}</h2>
              <p>{detailProduct.productDetails}</p>
              <img
                src={`data:image/jpeg;base64,${detailProduct.image}`}
                alt={detailProduct.name}
                style={{ width: "90%", height: "80%" }}
              />
              <button
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
                <i> додати в кошик</i>
              </button>
              <Suspense fallback={<h1>loading parent data</h1>}>
                <Await resolve={parentData}>
                  {(products: ProductType[]) => {
                    return (
                      <ul>
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
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default DetailProduct
