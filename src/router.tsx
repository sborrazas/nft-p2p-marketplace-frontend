import {
  createRoutesFromElements,
  createBrowserRouter,
  Outlet, 
  Link 
} from "react-router-dom"
import { Route } from "react-router"

import AllAuctionsPage from './pages/AllAuctionsPage';
import MyAuctionsPage from './pages/MyAuctionsPage';
import MyNftsPage from "./pages/MyNftsPage";

const FallbackRoute = () => {
  return (<div>Not found</div>)
}

const Home = () => {
  return (<div><h2>Home</h2></div>)
}

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nfts">My NFTS</Link>
          </li>
          <li>
            <Link to="/auctions">My Auctions</Link>
          </li>
          <li>
            <Link to="/all-auctions">All Auctions</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/nfts" element={<MyNftsPage />} />
      <Route path="/auctions" element={<MyAuctionsPage />} />
      <Route path="/all-auctions" element={<AllAuctionsPage />} />
      <Route path="*" element={<FallbackRoute />} />
    </Route>
  )
)

