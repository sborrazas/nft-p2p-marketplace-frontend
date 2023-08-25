import {
  createRoutesFromElements,
  createBrowserRouter
} from "react-router-dom"
import { Route } from "react-router"

import AuctionsPage from './pages/AuctionsPage';
import MyNftsPage from "./pages/MyNftsPage";

const FallbackRoute = () => {
  return (<div>Not found</div>)
}

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<FallbackRoute />}>
      <Route index element={<AuctionsPage />} />
      <Route path="/nfts" element={<MyNftsPage />} />
    </Route>
  )
)
