import { createSlice, createAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { NftAndOffer } from "../marketplace"

type OffersState = {
  isLoading: boolean
  data: Array<NftAndOffer>
}

export const initialState: OffersState = {
  isLoading: false,
  data: []
}

type LoadSuccessParams = {
  offers: Array<NftAndOffer>
}

export const load = createAction("offers/load")
export const loadSuccess = createAction("offers/loadSuccess", ({ offers }: LoadSuccessParams) => {
  return { payload: offers }
})

export const selectOffers = (state: RootState): OffersState => state.offers

export default createSlice({
  name: "offers",
  initialState,
  reducers: {
    load: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    loadSuccess: (draftState, { payload: myOffers }) => {
      draftState.isLoading = false
      draftState.data = myOffers
    },
  }
})
