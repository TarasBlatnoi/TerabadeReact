import ProductAPI from "../../api/Product/ProductAPI"
import { json, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ProductType } from "../../types/Product"

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
  return (
    <div>
      <h2>{productDetail.name}</h2>
      <p>{productDetail.productDetails}</p>
      <img
        src={`data:image/jpeg;base64,${productDetail.image}`}
        alt={productDetail.name}
        style={{ width: "90%", height: "80%" }}
      />
    </div>
  )
}

export default MenDetail
