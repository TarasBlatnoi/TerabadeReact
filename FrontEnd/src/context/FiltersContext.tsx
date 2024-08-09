import { createContext, useContext, useState } from "react"

type FiltersProviderProps = {
  children: React.ReactElement[] | React.ReactElement
}

const FiltersContext = createContext(null) as React.Context<null | {
  isOpenFilters: boolean
  setIsOpenFilters: Function
}>

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [isOpenFilters, setIsOpenFilters] = useState(true)

  return (
    <FiltersContext.Provider value={{ isOpenFilters, setIsOpenFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  const contextValue = useContext(FiltersContext)
  if (!contextValue)
    throw new Error(
      "Filters context have to be used only within FiltersProvider"
    )
  return contextValue
}
