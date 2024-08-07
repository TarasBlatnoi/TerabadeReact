import { createContext, ReactNode, useReducer, useState } from "react"

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
})

export interface CartItemType {
  id: string
  name: string
  price: number
  image: string
  quantity?: number
}

interface CartState {
  items: CartItemType[]
}

enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  RESET_ITEMS = "RESET_ITEMS",
}

type CartAction =
  | { type: CartActionType.ADD_ITEM; payload: CartItemType }
  | { type: CartActionType.DELETE_ITEM; payload: string }
  | { type: CartActionType.RESET_ITEMS }

function cartReducer(state: CartState, action: CartAction) {
  const { type } = action
  if (type === CartActionType.ADD_ITEM) {
    const item = action.payload
    const indexOfItem = state.items.findIndex(
      (itemInCopy) => itemInCopy.id === item.id
    )

    if (indexOfItem > -1) {
      const copyOfItems = [...state.items]
      copyOfItems[indexOfItem] = {
        ...copyOfItems[indexOfItem],
        quantity: (copyOfItems[indexOfItem].quantity || 0) + 1,
      }
      return { ...state, items: copyOfItems }
    } else {
      item.quantity = 1
      return {
        ...state,
        items: [...state.items, item],
      }
    }
  }
  if (type === CartActionType.DELETE_ITEM) {
    const idOfItem = action.payload
    const indexOfItem = state.items.findIndex(
      (itemInCart) => itemInCart.id === idOfItem
    )
    if (indexOfItem === -1) {
      return state
    }

    const copyOfItems = [...state.items]

    if (
      copyOfItems[indexOfItem].quantity &&
      copyOfItems[indexOfItem].quantity > 1
    ) {
      copyOfItems[indexOfItem] = {
        ...copyOfItems[indexOfItem],
        quantity: copyOfItems[indexOfItem].quantity - 1,
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
    return {
      ...state,
      items: [],
    }
  }
  return state
}

const initialState: CartState = {
  items: [],
}

interface CartProviderProps {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isOpened, setIsOpened] = useState(false)
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
  const contextValue = {
    cartItems: state.items,
    addCartItem,
    deleteCartItem,
    resetCartItems,
    isOpened,
    openCart,
    closeCart,
  }
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
