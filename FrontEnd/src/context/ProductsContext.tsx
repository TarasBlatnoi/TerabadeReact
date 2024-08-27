import React, { createContext, ReactNode, useContext, useState } from "react"

const ProductsContext = createContext(null) as React.Context<null | {
  productsAmount: number
  setProductsAmount: React.Dispatch<React.SetStateAction<number>>
}>

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [productsAmount, setProductsAmount] = useState<number>(0)
  return (
    <ProductsContext.Provider
      value={{
        productsAmount,
        setProductsAmount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsCount() {
  const value = useContext(ProductsContext)
  if (!value) throw new Error("Products provider")
  return value
}
