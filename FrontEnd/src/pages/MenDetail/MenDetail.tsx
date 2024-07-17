import ProductAPI from "../../api/Product/ProductAPI"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ProductType } from "../../types/Product"

export function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("Product ID is required")
  }
  try {
    const res = ProductAPI.getById(params.id)
    return res
  } catch (err) {
    throw { message: "Some problem while getting product from server" }
  }
}

const MenDetail = () => {
  const productDetail = useLoaderData() as ProductType
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
