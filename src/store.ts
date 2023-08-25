import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import auctionsSlice from "./slices/auctionsSlice"
import nftsSlice from "./slices/nftsSlice"
import walletSlice from "./slices/walletSlice"

const store = configureStore({
  reducer: {
    auctions: auctionsSlice.reducer,
    nfts: nftsSlice.reducer,
    wallet: walletSlice.reducer
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
