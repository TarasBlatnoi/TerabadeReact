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
type loaderParams = {
  params: { id: string }
}

export function loader({ params }: loaderParams) {
  return defer({ data: ProductAPI.getById(params.id) })
}
type DetailProductProps = {
  parentRouteId: string
}

function DetailProduct({ parentRouteId }: DetailProductProps) {
  const { data } = useLoaderData() as { data: AxiosResponse<ProductType[]> }
  const { addCartItem, openCart } = useContext(CartContext)
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Await resolve={data}>
        {(data) => {
          const product = data[0]
          return (
            <>
              <Link to="../men">
                <h3 style={{ color: "red" }}>
                  <span>&larr;</span>
                </h3>
              </Link>
              <h2>{product.name}</h2>
              <p>{product.productDetails}</p>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                style={{ width: "90%", height: "80%" }}
              />
              <button
                onClick={() => {
                  handleClick({
                    id: `${product.ProductID}`,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                  })
                  openCart()
                }}
              >
                <i> додати в кошик</i>
              </button>
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default DetailProduct
