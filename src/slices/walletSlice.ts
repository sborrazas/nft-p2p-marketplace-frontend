import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type WalletState = {
  isLoading: boolean
  wallet: string | null
}

export const initialState: WalletState = {
  isLoading: false,
  wallet: null
}

type LoadSuccessParams = {
  wallet: string
}

export const load = createAction("wallet/load")
export const loadSuccess = createAction("wallet/loadSuccess", ({ wallet }: LoadSuccessParams) => {
  return { payload: { wallet } }
})

export const selectWallet = (state: RootState): WalletState => state.wallet

export default createSlice({
  name: "wallet",
  initialState,
  reducers: {
    load: (draftState) => {
      draftState.isLoading = true
      draftState.wallet = null
    },
    loadSuccess: (draftState, { payload: { wallet }}: PayloadAction<LoadSuccessParams>) => {
      draftState.isLoading = false
      draftState.wallet = wallet
    },
  }
})
