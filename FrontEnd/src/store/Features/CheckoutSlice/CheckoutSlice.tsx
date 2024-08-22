import { createSlice } from "@reduxjs/toolkit"

export type initialStateType = {
  paymentAmount: number
  paymentDiscount: number
}

const initialState = {
  paymentAmount: 0,
  paymentDiscount: 0,
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    updateAmount(state, action: { payload: number }) {
      if (state.paymentDiscount > action.payload)
        throw new Error("Invalid price")
      state.paymentAmount = action.payload
    },
    updateDiscount(state, action: { payload: number }) {
      if (action.payload > state.paymentAmount)
        throw new Error("Invalid discount")
      state.paymentDiscount = action.payload
    },
  },
})

export const { updateAmount, updateDiscount } = checkoutSlice.actions

export default checkoutSlice.reducer
