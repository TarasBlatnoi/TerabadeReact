import { configureStore } from "@reduxjs/toolkit"
import FiltersReducer, {
  initialStateType as FiltersType,
} from "./Features/FiltersSlice/FiltersSlice"
import CheckoutReducer, {
  initialStateType as CheckoutType,
} from "./Features/CheckoutSlice/CheckoutSlice"

export type storeType = {
  filters: FiltersType
  checkout: CheckoutType
}

export const store = configureStore({
  reducer: {
    filters: FiltersReducer,
    checkout: CheckoutReducer,
  },
})
