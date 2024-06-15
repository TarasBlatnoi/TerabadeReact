import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react"

type ValueType = {
  ulHovered: boolean
  setUlHovered: Dispatch<SetStateAction<boolean>>
  navInteractiveHovered: boolean
  setNavInteractiveHovered: Dispatch<SetStateAction<boolean>>
  hasHovered: boolean
  setHasHovered: Dispatch<SetStateAction<boolean>>
}

const HeaderContext = createContext<ValueType | null>(null)

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider")
  }
  return context
}

type HeaderProviderProps = {
  children: ReactNode
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [ulHovered, setUlHovered] = useState(false)
  const [navInteractiveHovered, setNavInteractiveHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)
  return (
    <HeaderContext.Provider
      value={{
        ulHovered,
        setUlHovered,
        navInteractiveHovered,
        setNavInteractiveHovered,
        hasHovered,
        setHasHovered,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
