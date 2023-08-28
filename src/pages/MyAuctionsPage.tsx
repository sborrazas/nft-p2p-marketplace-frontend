import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAuctions, Auction } from "../middleware"
import { load as loadAuctions, loadSuccess as loadAuctionsSuccess, selectAuctions } from '../slices/auctionsSlice';
import { selectWallet, load as loadWallet, loadSuccess as loadWalletSuccess } from "../slices/walletSlice"
import { getWallet } from "../aeternity"

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
      else {
        const wallet = await getWallet()

        dispatch(loadWallet())
        dispatch(loadWalletSuccess({ wallet }))
      }
    }

    void load()
  }, [dispatch, wallet])

  return (
    <ul>
      {auctions.data && auctions.data.map((auction : Auction) => {
          const collection = auction.collection
          const token = auction.token
          return (
            <li key={`${collection}-${token}`}>Collection: {collection}, Token: {token}, Price: {auction.price} </li>
          )
        })}
    </ul>
  );
}
