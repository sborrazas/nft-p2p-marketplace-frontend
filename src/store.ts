import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import auctionsSlice from "./slices/auctionsSlice"

const store = configureStore({
  reducer: {
    auctions: auctionsSlice.reducer
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
