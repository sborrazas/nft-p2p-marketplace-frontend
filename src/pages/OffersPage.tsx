import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectOffers, load as loadOffers, loadSuccess as loadOffersSuccess } from "../slices/offersSlice"
import { selectWallet } from "../slices/walletSlice"
import { Account, NftAndMetadata, WALLET } from "../middleware"
import { getNftsWithMetadata } from "../nftUtil"
import Root from "../components/Root";
import OfferCard from "../components/OfferCard";
import WalletBanner from "../components/WalletBanner";
import { NftAndOffer, getMarketplaceInstance } from "../marketplace"

const getNftsWithOffers = async(address : Account) => {
  const marketplace = await getMarketplaceInstance()
  const nftsAndMetadata = await getNftsWithMetadata(address)
  const nftsAndOffers = await Promise.all(nftsAndMetadata.map(async (nft : NftAndMetadata): Promise<NftAndOffer> => {
    const offer = await marketplace.getOfferFromOffers(nft);

    return { account: offer.account, value: offer.value, ...nft }
  }));

  return nftsAndOffers.filter(({value}) => value !== -1)
}

export default function OffersPage() {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)
  const offers = useAppSelector(selectOffers)

  useEffect(() => {
    const load = async () => {
      if (wallet.wallet) {
        dispatch(loadOffers())
        const nftsAndoffers = await getNftsWithOffers(WALLET)
        dispatch(loadOffersSuccess({ offers: nftsAndoffers }))
      }
    }

    void load()
  }, [wallet.wallet, dispatch]);

  return (
    <Root title="My NFTs Offers">
      {wallet.wallet ? (
        <Fragment>
          {
            offers.data && offers.data.map(({ account, contract_id, contractName, tokenName, token_id, value }: NftAndOffer) => {
              return (
                <OfferCard key={`${contract_id}-${token_id}`} account={account} value={value} contractId={contract_id} contractName={contractName} tokenId={token_id} tokenName={tokenName} />
              )
            })
          }
        </Fragment>) : (<WalletBanner />)}
    </Root>
  );
} 