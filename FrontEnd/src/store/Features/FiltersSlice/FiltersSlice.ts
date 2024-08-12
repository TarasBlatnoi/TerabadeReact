import { createSlice } from "@reduxjs/toolkit"

export type initialStateType = {
  visibility: boolean
  gender: {
    men: boolean
    women: boolean
    children: boolean
  }
  price: Array<{ min: number; max: number }>
  style: Array<string>
  size: Array<number>
}

const initialState = {
  visibility: true,
  gender: {
    men: false,
    women: false,
    children: false,
  },
  price: [],
  style: [],
  size: [],
} as initialStateType

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateVisibility(state) {
      state.visibility = !state.visibility
    },
    updateGender(
      state,
      action: { payload: { gender: "men" | "women" | "children" } }
    ) {
      state.gender[action.payload.gender] = !state.gender[action.payload.gender]
    },
    updateSize(
      state,
      action: { payload: { size: number; action: "add" | "delete" } }
    ) {
      if (action.payload.action === "add") state.size.push(action.payload.size)
      else {
        const set = new Set(state.size)
        set.delete(action.payload.size)
        state.size = [...set]
      }
    },
    updatePrice(
      state,
      action: { payload: { min: number; max: number; checked: boolean } }
    ) {
      if (action.payload.checked) {
        state.price.push({ min: action.payload.min, max: action.payload.max })
      } else {
        const index = state.price.findIndex(
          (priceTag) =>
            priceTag.min === action.payload.min &&
            priceTag.max === action.payload.max
        )

        state.price.splice(index, 1)
      }
      state.price.sort(({ min }, { min: nextMin }) => {
        if (min > nextMin) return 1
        else if (min < nextMin) return -1
        else return 0
      })
    },
    updateStyle(
      state,
      action: { payload: { style: string; action: "add" | "delete" } }
    ) {
      if (action.payload.action === "add")
        state.style.push(action.payload.style)
      else {
        const set = new Set(state.style)
        set.delete(action.payload.style)
        state.style = [...set]
      }
    },
  },
})

export const {
  updateGender,
  updatePrice,
  updateSize,
  updateStyle,
  updateVisibility,
} = filtersSlice.actions

export default filtersSlice.reducer
