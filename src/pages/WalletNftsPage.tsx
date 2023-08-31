import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectNfts, load as loadNfts, loadSuccess as loadNftsSuccess } from "../slices/nftsSlice"
import { selectWallet } from "../slices/walletSlice"
import { Account, NftAndMetadata, WALLET } from "../middleware"
import { NftAndOffer, getMarketplaceInstance } from "../marketplace"
import { getNftsWithMetadata } from "../nftUtil"
import Root from "../components/Root";
import NftCard from "../components/NftCard";
import WalletBanner from "../components/WalletBanner";

const getNftsWithOffers = async(address : Account) => {
  const marketplace = await getMarketplaceInstance()
  const nftsAndMetadata = await getNftsWithMetadata(address)
  const nftsAndOffers = await Promise.all(nftsAndMetadata.map(async (nft : NftAndMetadata): Promise<NftAndOffer> => {
    const offer = await marketplace.getOfferFromOffers(nft);

    return { bidAccount: offer.bidAccount, bidValue: offer.bidValue, ...nft }
  }));

  return nftsAndOffers
}

export default function MyNftsPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const nfts = useAppSelector(selectNfts)

  useEffect(() => {
    const load = async () => {
      if (wallet.wallet) {
        dispatch(loadNfts())
        const nfts = await getNftsWithOffers(WALLET)
        dispatch(loadNftsSuccess({ nfts: nfts }))
      }
    }

    void load()
  }, [wallet.wallet, dispatch]);

  return (
    <Root title="My NFTs">
      {wallet.wallet ? (
        <Fragment>
          {
            nfts.data && nfts.data.map(({contract_id, contractName, token_id, tokenName, mediaUrl, bidAccount, bidValue}: NftAndOffer) => {
              return (
                <NftCard key={`${contract_id}-${token_id}`} bidAccount={bidAccount} bidValue={bidValue} contractId={contract_id} contractName={contractName} mediaUrl={mediaUrl} tokenId={token_id} tokenName={tokenName} />
              )
            })
          }
        </Fragment>) : (<WalletBanner />)}
    </Root>
  );
}
