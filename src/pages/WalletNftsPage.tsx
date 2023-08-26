import { useEffect } from "react"
import { selectNfts, load as loadNfts, loadSuccess as loadNftsSuccess } from "../slices/nftsSlice"
import { selectWallet, load as loadWallet, loadSuccess as loadWalletSuccess } from "../slices/walletSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAccountNfts, Nft } from "../middleware"
import { getWallet } from "../aeternity"

export default function WalletNftsPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const nfts = useAppSelector(selectNfts)

  useEffect(() => {
    dispatch(loadWallet())

    const load = async () => {
      console.log("GETTING WALLET")
      const wallet = await getWallet()

      dispatch(loadWalletSuccess({ wallet }))
      dispatch(loadNfts())

      const nftsResponse = await getAccountNfts(wallet)

      if (nftsResponse.success) {
        dispatch(loadNftsSuccess({ nfts: nftsResponse.data }))
      }
    }

    void load()
  }, [dispatch])

  return (
    <div>
      <h1>My NFTs (wallet {wallet.wallet ? wallet.wallet : "unknown"})</h1>
      <ul>
        {nfts.data.map(({ contract_id, owner_id, token_id } : Nft) => {
          return (
            <li key={`${contract_id}-${token_id}`}>Contract: {contract_id}. Owner: {owner_id}. Token: {token_id}</li>
          )
        })}
      </ul>
    </div>
  )
}