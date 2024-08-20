import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"

export const CartContext = createContext({
  cartItems: [] as CartItemType[],
  addCartItem: (item: CartItemType) => {
    console.log(item)
  },
  deleteCartItem: (id: string) => {
    console.log(id)
  },
  resetCartItems: () => {},
  isOpened: false,
  openCart: () => {},
  closeCart: () => {},
  removeItem: (id: string, size: number) => undefined,
  setItemQuantity: (id: string, size: number, quantity: number) => undefined,
})

export interface CartItemType {
  id: string
  name: string
  price: number
  image: string
  quantity?: number
  sex: string
  type: string
  size: number
}

interface CartState {
  items: CartItemType[]
}

enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  RESET_ITEMS = "RESET_ITEMS",
  REMOVE_ITEM = "REMOVE_ITEM",
  SET_QUANTITY = "SET_QUANTITY",
}

type CartAction =
  | { type: CartActionType.ADD_ITEM; payload: CartItemType }
  | { type: CartActionType.DELETE_ITEM; payload: string }
  | { type: CartActionType.RESET_ITEMS }
  | { type: CartActionType.REMOVE_ITEM; payload: { id: string; size: number } }
  | {
      type: CartActionType.SET_QUANTITY
      payload: { id: string; size: number; quantity: number }
    }

function cartReducer(state: CartState, action: CartAction) {
  const { type } = action
  if (type === CartActionType.ADD_ITEM) {
    const item = action.payload
    const indexOfItem = state.items.findIndex(
      (itemInCopy) =>
        itemInCopy.id === item.id && itemInCopy.size === item.size,
    )
    const copyOfItems = [...state.items]
    if (indexOfItem > -1) {
      copyOfItems[indexOfItem] = {
        ...copyOfItems[indexOfItem],
        quantity: (copyOfItems[indexOfItem].quantity || 0) + 1,
      }
    } else {
      item.quantity = 1
      copyOfItems.push(item)
    }
    return { ...state, items: copyOfItems }
  }

  if (type === CartActionType.DELETE_ITEM) {
    const idOfItem = action.payload
    const indexOfItem = state.items.findIndex(
      (itemInCart) => itemInCart.id === idOfItem,
    )
    if (indexOfItem === -1) {
      return state
    }

    const copyOfItems = [...state.items]

    const item = copyOfItems[indexOfItem]

    if (
      item !== undefined &&
      item.quantity !== undefined &&
      item.quantity > 1
    ) {
      copyOfItems[indexOfItem] = {
        ...item,
        quantity: item.quantity - 1,
      }
    } else {
      copyOfItems.splice(indexOfItem, 1)
    }
    return {
      ...state,
      items: copyOfItems,
    }
  }
  if (type === CartActionType.RESET_ITEMS) {
    const emptyCart = {
      ...state,
      items: [],
    }
    return emptyCart
  }
  if (type === CartActionType.REMOVE_ITEM) {
    const itemsCopy = [...state.items]
    const indexOfItem = itemsCopy.findIndex(
      (item) =>
        item.id === action.payload.id && item.size === action.payload.size,
    )
    itemsCopy.splice(indexOfItem, 1)
    return { ...state, items: itemsCopy }
  }
  if (type === CartActionType.SET_QUANTITY) {
    const itemsCopy = [...state.items]
    const item = itemsCopy.find(
      (item) =>
        item.id === action.payload.id && item.size === action.payload.size,
    )
    item!.quantity = action.payload.quantity

    return { ...state, items: itemsCopy }
  }
  return state
}

let initialState: CartState

const storedCart = localStorage.getItem("cart")

if (storedCart) {
  const parsedCart = JSON.parse(storedCart)
  initialState = { items: parsedCart }
} else {
  initialState = {
    items: [],
  }
}

interface CartProviderProps {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
    const id = setTimeout(() => setIsOpened(false), 3000)
    return () => clearTimeout(id)
  }, [state.items])

  function addCartItem(item: CartItemType) {
    dispatch({ type: CartActionType.ADD_ITEM, payload: item })
  }
  function deleteCartItem(id: string) {
    dispatch({ type: CartActionType.DELETE_ITEM, payload: id })
  }
  function resetCartItems() {
    dispatch({ type: CartActionType.RESET_ITEMS })
  }
  function openCart() {
    setIsOpened(true)
  }
  function closeCart() {
    setIsOpened(false)
  }
  function removeItem(id: string, size: number): undefined {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: { id, size } })
  }
  function setItemQuantity(
    id: string,
    size: number,
    quantity: number,
  ): undefined {
    dispatch({
      type: CartActionType.SET_QUANTITY,
      payload: { id, size, quantity },
    })
  }
  const contextValue = {
    cartItems: state.items,
    addCartItem,
    deleteCartItem,
    resetCartItems,
    isOpened,
    openCart,
    closeCart,
    setItemQuantity,
    removeItem,
  }
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value)
    throw new Error("Cart context have to be used whithin CartProvider")
  return value
}
