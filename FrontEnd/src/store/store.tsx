import { configureStore } from "@reduxjs/toolkit"
import FiltersReducer, {
  initialStateType as FiltersType,
} from "./Features/FiltersSlice/FiltersSlice"

export type storeType = {
  filters: FiltersType
}

export const store = configureStore({
  reducer: {
    filters: FiltersReducer,
  },
})
