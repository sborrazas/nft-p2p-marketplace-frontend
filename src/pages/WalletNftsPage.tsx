import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectNfts, load as loadNfts, loadSuccess as loadNftsSuccess } from "../slices/nftsSlice"
import { selectWallet } from "../slices/walletSlice"
import { getAccountNfts, getMetadata, getMetainfo, Nft, NftAndMetadata, Metainfo, WALLET } from "../middleware"
import Root from "../components/Root";
import NftCard from "../components/NftCard";
import WalletBanner from "../components/WalletBanner";

const loadMetadata = async (nft : Nft) => {
  const response = await getMetadata(nft.contract_id, nft.token_id)
  let mediaUrl = ""
  let name = ""

  if (response.success) {
    const metadata = response.data

    if (metadata != null) {
      if ('map' in metadata) {
        if (metadata.map != null && 'media_url' in metadata.map) {
          name = metadata.map.name
          mediaUrl = metadata.map.media_url
        }
      } else if ('url' in metadata) {
        mediaUrl = metadata.url || mediaUrl
      }
    }
  } else {
    console.log("Failed to fetch Metadata");
  }

  return {url: formatUrl(mediaUrl), name: name}
}

function formatUrl(url : string) {
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/') + '.png'
  } else {
    return url
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

        // const nftsResponse = await getAccountNfts(wallet.wallet)
        const nftsResponse = await getAccountNfts(WALLET)

        if (nftsResponse.success) {
          const nftsAndMetadata = await Promise.all(nftsResponse.data.map(async (nft): Promise<NftAndMetadata> => {
            const metadata = await loadMetadata(nft);
            const metainfoResponse = await getMetainfo(nft.contract_id);
            let metainfo : Metainfo = {
              contract_id: nft.contract_id,
              name: "",
              symbol: ""
            }
            
            if (metainfoResponse.success) {
              metainfo = metainfoResponse.data
            }

            return { tokenName: metadata.name, mediaUrl: metadata.url, contractName: metainfo.name, ...nft }
          }))

          dispatch(loadNftsSuccess({ nfts: nftsAndMetadata }))
        }
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
