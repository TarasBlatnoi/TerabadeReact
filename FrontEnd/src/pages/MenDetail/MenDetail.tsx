import ProductAPI from "../../api/Product/ProductAPI"
import { json, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ProductType } from "../../types/Product"
import { CartContext } from "../../context/CartContext"
import { useContext } from "react"
import { CartItemType } from "../../context/CartContext"

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

const MenDetail = () => {
  const productDetailArr = useLoaderData() as ProductType[]
  const productDetail = productDetailArr[0]
  const { addCartItem, openCart } = useContext(CartContext)
  function handleClick(item: CartItemType) {
    addCartItem(item)
  }
  return (
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
  )
}

export default MenDetail
