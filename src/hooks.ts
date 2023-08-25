import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//
// Lint note: there's false positive there, since the function wrapper is needed
// to enforce the type constraint and the return type inferred is complex enough that
// we don't really want to manually readd it here to just mollify the boundary types rule.
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
