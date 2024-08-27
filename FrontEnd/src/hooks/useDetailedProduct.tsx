import { useQuery } from "react-query"
import ProductAPI from "../api/Product/ProductAPI"
import { DetailProductType } from "../types"
import { useParams } from "react-router-dom"

function useDetailedProduct() {
  const params = useParams()
  const {
    data: [detailProduct],
  } = useQuery({
    queryFn: () => ProductAPI.getById(params.id!),
    queryKey: [params.id!],
    staleTime: Infinity,
  }) as { data: Array<DetailProductType> }
  return detailProduct
}

export default useDetailedProduct
