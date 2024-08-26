import { useQuery } from "react-query"

export function useFetchedData(
  queryFn: () => unknown,
  ...queryKey: Array<string | number>
) {
  const { data, isLoading } = useQuery({
    queryKey: [...queryKey],
    queryFn: queryFn,
    staleTime: Infinity,
  })

  return { data, isLoading }
}
