import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectNfts, load as loadNfts, loadSuccess as loadNftsSuccess } from "../slices/nftsSlice"
import { selectWallet } from "../slices/walletSlice"
import { getAccountNfts, getMetadata, Nft, NftAndMetadata } from "../middleware"
import Root from "../components/Root";
import WalletBanner from "../components/WalletBanner";

const loadMetadata = async (nft : Nft) => {
  const response = await getMetadata(nft.contract_id, nft.token_id)

  if (response.success) {
    return response.data
  } else {
    console.log("Failed to fetch Metadata");
    return {map: null}
  }
}

export default function MyNftsPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const nfts = useAppSelector(selectNfts)

  useEffect(() => {
    const load = async () => {
      if (wallet.wallet) {
        dispatch(loadNfts())

        const nftsResponse = await getAccountNfts(wallet.wallet)

        if (nftsResponse.success) {
          const nftsAndMetadata = await Promise.all(nftsResponse.data.map(async (nft): Promise<NftAndMetadata> => {
            const metadata = await loadMetadata(nft);

            return { metadata, ...nft }
          }))

          dispatch(loadNftsSuccess({ nfts: nftsAndMetadata }))
        }
      }
    }

    void load()
  }, [wallet.wallet, dispatch]);

  return (
    <Root title="My NFTs">
      {wallet.wallet ? (<table>
        <thead>
        <tr>
          <td>Collection</td>
          <td>Token Id</td>
          <td>Metadata</td>
        </tr>
        </thead>
        <tbody>
        {
          nfts.data && nfts.data.map(({ contract_id, metadata, token_id }: NftAndMetadata) => {
            return (
              <tr key={`${contract_id}-${token_id}`}>
                <td>{contract_id}</td>
                <td>{token_id}</td>
                <td>{JSON.stringify(metadata)}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>) : (<WalletBanner />)}
    </Root>
  );
}
