import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useReducer,
} from "react"

type ValueType = Dispatch<actionType>

type HeaderProviderProps = {
  children: ReactNode
}

type hoverObjType = {
  ulHovered: false
  navInteractiveHovered: false
  hasHovered: false
  linkHovered: ""
}

type actionType = {
  type: actions
  payload: string | boolean
}

enum actions {
  ulHovered = "setUlHovered",
  navInteractiveHovered = "setNavInteractiveHovered",
  hasHovered = "setHasHovered",
  linkHovered = "setLinkHovered",
}

const HeaderContext = createContext<ValueType | null>(null)

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider")
  }
  return context
}

function reducer(state: hoverObjType, action: actionType) {
  switch (action.type) {
    case actions.ulHovered:
      return state
    default:
      return state
  }
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  /*const [ulHovered, setUlHovered] = useState(false)
  const [navInteractiveHovered, setNavInteractiveHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)
  const [linkHovered, setLinkHovered] = useState("")*/

  const [hoverObj, dispatch] = useReducer(reducer, {
    ulHovered: false,
    navInteractiveHovered: false,
    hasHovered: false,
    linkHovered: "",
  }) as [hoverObjType, (action: actionType) => void]

  return (
    <HeaderContext.Provider value={dispatch}>{children}</HeaderContext.Provider>
  )
}
