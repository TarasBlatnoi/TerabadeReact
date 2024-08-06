import { createContext, useContext, useState } from "react"

enum sortingOptions {
  standard = "Новинки",
  priceAscending = "Від дешевих до дорогих ",
  priceDescending = "Від дорогих до дешевих",
}

type ContextValueType = {
  productsSortMethod: sortingOptions
  setProductsSortMethod: Function
}

const SortContext = createContext(
  null
) as React.Context<null | ContextValueType>

type FiltersProviderProps = {
  children: React.ReactElement
}

function SortProvider({ children }: FiltersProviderProps) {
  const [productsSortMethod, setProductsSortMethod] = useState(
    sortingOptions.standard
  ) as [sortingOptions, Function]

  return (
    <SortContext.Provider
      value={{
        productsSortMethod,
        setProductsSortMethod,
      }}
    >
      {children}
    </SortContext.Provider>
  )
}

function useSort() {
  const contextValue = useContext(SortContext)
  if (!contextValue)
    throw new Error("Sort context must be used only withing SortProvider")
  return contextValue
}

export { useSort, SortProvider, sortingOptions }
