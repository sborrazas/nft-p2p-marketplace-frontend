import { createSlice, createAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Nft } from "../middleware"

type NftsState = {
  isLoading: boolean
  data: Array<Nft>
}

export const initialState: NftsState = {
  isLoading: false,
  data: []
}

type LoadSuccessParams = {
  nfts: Array<Nft>
}

export const load = createAction("nfts/load")
export const loadSuccess = createAction("nfts/loadSuccess", ({ nfts }: LoadSuccessParams) => {
  return { payload: nfts }
})

export const selectNfts = (state: RootState): NftsState => state.nfts

export default createSlice({
  name: "nfts",
  initialState,
  reducers: {
    load: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    loadSuccess: (draftState, { payload: myNfts }) => {
      draftState.isLoading = false
      draftState.data = myNfts
    },
  }
})
