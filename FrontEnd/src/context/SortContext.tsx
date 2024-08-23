import { createContext, SetStateAction, useContext, useState } from "react"

enum sortingOptions {
  standard = "Новинки",
  priceAscending = "Ціна: Висока-Низька",
  priceDescending = "Ціна: Низька-Висока",
}

type ContextValueType = {
  productsSortMethod: sortingOptions
  setProductsSortMethod: React.Dispatch<SetStateAction<sortingOptions>>
}

const SortContext = createContext(
  null,
) as React.Context<null | ContextValueType>

type FiltersProviderProps = {
  children: React.ReactElement
}

function SortProvider({ children }: FiltersProviderProps) {
  const [productsSortMethod, setProductsSortMethod] = useState(
    sortingOptions.standard,
  ) as [sortingOptions, React.Dispatch<SetStateAction<sortingOptions>>]

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
