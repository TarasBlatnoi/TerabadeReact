import { useQuery } from "react-query"

export function useFetchedData(
  queryFn: () => unknown,
  ...queryKey: Array<string | number>
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...queryKey],
    queryFn: queryFn,
    staleTime: Infinity,
  })

  if (isError)
    throw new Error(error?.message || "Some error has occured, try again")

  return { data, isLoading }
}
