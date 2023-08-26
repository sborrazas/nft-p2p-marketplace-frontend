import { useEffect } from "react"
import { selectAuctions, load as loadAuctions, loadSuccess as loadAuctionsSuccess } from "../slices/auctionsSlice"
import { selectWallet, load as loadWallet, loadSuccess as loadWalletSuccess } from "../slices/walletSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAuctions, Auction } from "../middleware"
import { getWallet } from "../aeternity"

export default function MyAuctionsPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const auctions = useAppSelector(selectAuctions)

  useEffect(() => {
    dispatch(loadWallet())

    const load = async () => {
      console.log("GETTING WALLET")
      const wallet = await getWallet()

      dispatch(loadWalletSuccess({ wallet }))
      dispatch(loadAuctions())

      const response = await getAuctions(wallet)

      if (response.success) {
        dispatch(loadAuctionsSuccess({ auctions: response.data }))
      }
    }

    void load()
  }, [dispatch])

  return (
    <div>
      <h1>My Auctions (wallet {wallet.wallet ? wallet.wallet : "unknown"})</h1>
      <ul>
        {auctions.data.map((auction : Auction) => {
          const collection = auction.collection
          const token = auction.token
          return (
            <li key={`${collection}-${token}`}>Collection: {collection}, Token: {token}, Price: {auction.price} </li>
          )
        })}
      </ul>
    </div>
  )
}

