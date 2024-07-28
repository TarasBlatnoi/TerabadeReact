import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react"

export type hoverType = {
  hoverObj: hoverObjType
  dispatch: Dispatch<actionType>
}

type HeaderProviderProps = {
  children: ReactNode
}

type hoverObjType = {
  ulHovered: boolean
  navInteractiveHovered: boolean
  hasHovered: boolean
  linkHovered: string
}

type actionType = {
  type: actions
  payload?: string | boolean
}

export enum actions {
  ulHovered = "setUlHovered",
  navInteractiveHovered = "setNavInteractiveHovered",
  hasHovered = "setHasHovered",
  linkHovered = "setLinkHovered",
  mouseLeave = "handleMouseLeave",
  mouseEnterList = "handleMouseEnterList",
}

const HeaderContext = createContext<hoverType | null>(null)

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider")
  }
  return context
}

function reducer(state: hoverObjType, action: actionType): hoverObjType {
  switch (action.type) {
    case actions.linkHovered:
      return { ...state, linkHovered: String(action.payload) }
    case actions.navInteractiveHovered:
      return { ...state, navInteractiveHovered: Boolean(action.payload) }
    case actions.mouseLeave:
      return {
        ...state,
        navInteractiveHovered: false,
        ulHovered: false,
        linkHovered: "",
      }
    case actions.mouseEnterList:
      return { ...state, hasHovered: true, ulHovered: true }
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
    <HeaderContext.Provider value={{ hoverObj, dispatch }}>
      {children}
    </HeaderContext.Provider>
  )
}
