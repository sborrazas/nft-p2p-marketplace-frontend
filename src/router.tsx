import {
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom"
import { Route } from "react-router"

import Home from "./pages/Home"
import AllAuctionsPage from './pages/AllAuctionsPage'
import MyAuctionsPage from './pages/MyAuctionsPage'
import WalletNftsPage from "./pages/WalletNftsPage"

const FallbackRoute = () => {
  return (<div>Not found</div>)
}

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/nfts" element={<WalletNftsPage />} />
      <Route path="/auctions" element={<MyAuctionsPage />} />
      <Route path="/all-auctions" element={<AllAuctionsPage />} />
      <Route path="*" element={<FallbackRoute />} />
    </Route>
  )
)
