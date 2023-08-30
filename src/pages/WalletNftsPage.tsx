import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectNfts, load as loadNfts, loadSuccess as loadNftsSuccess } from "../slices/nftsSlice"
import { selectWallet } from "../slices/walletSlice"
import { NftAndMetadata, WALLET } from "../middleware"
import { getNftsWithMetadata } from "../nftUtil"
import Root from "../components/Root";
import NftCard from "../components/NftCard";
import WalletBanner from "../components/WalletBanner";

export default function MyNftsPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const nfts = useAppSelector(selectNfts)

  useEffect(() => {
    const load = async () => {
      if (wallet.wallet) {
        dispatch(loadNfts())
        const nftsAndMetadata = await getNftsWithMetadata(WALLET)
        dispatch(loadNftsSuccess({ nfts: nftsAndMetadata }))
      }
    }

    void load()
  }, [wallet.wallet, dispatch]);

  return (
    <Root title="My NFTs">
      {wallet.wallet ? (
        <Fragment>
          {
            nfts.data && nfts.data.map(({ contract_id, contractName, mediaUrl, tokenName, token_id }: NftAndMetadata) => {
              return (
                <NftCard key={`${contract_id}-${token_id}`} contractId={contract_id} contractName={contractName} tokenId={token_id} mediaUrl={mediaUrl} tokenName={tokenName} />
              )
            })
          }
        </Fragment>) : (<WalletBanner />)}
    </Root>
  );
}
