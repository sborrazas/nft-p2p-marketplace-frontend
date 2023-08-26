import {
  createRoutesFromElements,
  createBrowserRouter
} from "react-router-dom"
import { Route } from "react-router"

import AllAuctionsPage from './pages/AllAuctionsPage';
import MyAuctionsPage from './pages/MyAuctionsPage';
import MyNftsPage from "./pages/MyNftsPage";

const FallbackRoute = () => {
  return (<div>Not found</div>)
}

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<FallbackRoute />}>
      <Route index element={<AllAuctionsPage />} />
      <Route path="/auctions" element={<MyAuctionsPage />} />
      <Route path="/nfts" element={<MyNftsPage />} />
    </Route>
  )
)
