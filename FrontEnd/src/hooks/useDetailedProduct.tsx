import { useQuery } from "react-query"
import ProductAPI from "../api/Product/ProductAPI"
import { DetailProductType } from "../types"

function useDetailedProduct(productId: string) {
  const {
    data: [detailProduct],
  } = useQuery({
    queryFn: () => ProductAPI.getById(productId),
    queryKey: [productId],
    staleTime: Infinity,
    suspense: true,
  }) as { data: Array<DetailProductType> }
  return detailProduct
}

export default useDetailedProduct
