import ProductAPI from "../../api/Product/ProductAPI"
import {
  Await,
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

interface ProductsPromiseType {
  menProducts: Promise<ProductType[]>
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw json(
      {
        message: "Product id is required",
      },
      { status: 400 }
    )
  }
  try {
    const res = await ProductAPI.getById(params.id)
    return res
  } catch (err) {
    throw json(
      {
        message: "Could not fetch your product",
      },
      { status: 500 }
    )
  }
}

const DetailProduct = () => {
  const productDetailArr = useLoaderData() as ProductType[]
  const menProductsPromise = useRouteLoaderData("men") as ProductsPromiseType
  const productDetail = productDetailArr[0]
  const { addCartItem, openCart } = useContext(CartContext)
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }
  return (
    <>
      <div>
        <h2>{productDetail.name}</h2>
        <p>{productDetail.productDetails}</p>
        <img
          src={`data:image/jpeg;base64,${productDetail.image}`}
          alt={productDetail.name}
          style={{ width: "90%", height: "80%" }}
        />
        <button
          onClick={() => {
            handleClick({
              id: `${productDetail.ProductID}`,
              name: productDetail.name,
              image: productDetail.image,
              price: productDetail.price,
            })
            openCart()
          }}
        >
          <i> додати в кошик</i>
        </button>
      </div>
      <Suspense fallback={<h1>Loading products...</h1>}>
        <Await resolve={menProductsPromise.menProducts}>
          {(menProducts) => {
            const recommendedProducts = menProducts.filter(
              (menProduct: ProductType) =>
                menProduct.ProductID !== productDetail.ProductID
            )
            return (
              <div>
                {recommendedProducts.map((product: ProductType) => {
                  return <CardItem key={product.ProductID} product={product} />
                })}
              </div>
            )
          }}
        </Await>
      </Suspense>
    </>
  )
}

export default DetailProduct
