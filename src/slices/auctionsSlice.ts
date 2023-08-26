import { createSlice, createAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Auction } from "../middleware"

type AuctionsState = {
  isLoading: boolean
  data: Array<Auction>
}

export const initialState: AuctionsState = {
  isLoading: false,
  data: []
}

type LoadSuccessParams = {
  auctions: Array<Auction>
}

export const load = createAction("auctions/load")
export const loadSuccess = createAction("auctions/loadSuccess", ({ auctions }: LoadSuccessParams) => {
  return { payload: auctions }
})

export const selectAuctions = (state: RootState): AuctionsState => state.auctions

export default createSlice({
  name: "auctions",
  initialState,
  reducers: {
    load: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    loadSuccess: (draftState, { payload: myAuctions }) => {
      draftState.isLoading = false
      draftState.data = myAuctions
    },
  }
})
