import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAuctions, Auction } from "../middleware"
import { load as loadAuctions, loadSuccess as loadAuctionsSuccess, selectAuctions } from '../slices/auctionsSlice';
import { selectWallet } from "../slices/walletSlice"
import Root from "../components/Root";
import WalletBanner from "../components/WalletBanner";

export default function AllAuctionsPage() {
  const dispatch = useAppDispatch()
  const auctions = useAppSelector(selectAuctions)
  const wallet = useAppSelector(selectWallet)

  useEffect(() => {
    const load = async () => {
      if (wallet.wallet) {
        dispatch(loadAuctions())

        const response = await getAuctions(wallet.wallet)

        if (response.success) {
          dispatch(loadAuctionsSuccess({ auctions: response.data }))
        }
      }
    }

    void load()
  }, [dispatch, wallet])

  return (
    <Root title="My Auctions">
      {wallet.wallet ? (<ul>
        {auctions.data && auctions.data.map((auction : Auction) => {
            const collection = auction.collection
            const token = auction.token
            return (
              <li key={`${collection}-${token}`}>Collection: {collection}, Token: {token}, Price: {auction.price} </li>
            )
          })}
      </ul>) : (<WalletBanner />)}
    </Root>
  );
}
