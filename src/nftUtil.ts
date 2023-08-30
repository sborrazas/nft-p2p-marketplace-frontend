import { Account, getAccountNfts, getMetadata, getMetainfo, Nft, NftAndMetadata, Metainfo } from "./middleware"

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
  
export const getNftsWithMetadata = async(address : Account) => {
    const response = await getAccountNfts(address)

    if (response.success) {
        const nftsAndMetadata = await Promise.all(response.data.map(async (nft : Nft): Promise<NftAndMetadata> => {
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

        return nftsAndMetadata
    } else {
        return []
    }
}