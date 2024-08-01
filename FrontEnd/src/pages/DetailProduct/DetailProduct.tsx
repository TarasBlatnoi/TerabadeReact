import ProductAPI from "../../api/Product/ProductAPI"
import {
  Await,
  defer,
  json,
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
  /*const da2 = useRouteLoaderData(parentRouteId) as {
    data: AxiosResponse<ProductType[]>
  }*/
  // console.log(da2)
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
              {/*<Suspense fallback={<h1>Loading products...</h1>}>
                <Await resolve={parentData}>
                  {(menProducts) => {
                    const recommendedProducts = menProducts.filter(
                      (menProduct: ProductType) =>
                        menProduct.ProductID !== product.ProductID
                    )
                    return (
                      <div>
                        {recommendedProducts.map((product: ProductType) => {
                          return (
                            <CardItem
                              key={product.ProductID}
                              product={product}
                            />
                          )
                        })}
                      </div>
                    )
                  }}
                </Await>
              </Suspense>*/}
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}

export default DetailProduct
