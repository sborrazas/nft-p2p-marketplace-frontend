type Response<T> = {
  success: true
  data: T
}
| {
  success: false
  error: string
}

export type Account = string
export type Hash = string
export type TokenId = number

export type Nft = {
  contract_id: Account
  owner_id: Account
  token_id: TokenId
}

export type Metainfo = {
  contract_id: Account
  name: string
  symbol: string
}

export type NftAndMetadata = Nft & {
  contractName: string
  mediaUrl: string
  tokenName: string
}

// export type MetadataIdentifier = {id: string | number | null} 
export type MetadataUrl = {url: string | null} 
export type MetadataMap = {map: {name: string, media_url: string} | null}
export type Metadata = MetadataUrl | MetadataMap

export type CallTxArg = {
  type: string
  value: string | number
}

export type CallTx = {
  contract_id: Account
  arguments: Array<CallTxArg>
}

export type ResponseAuction = {
  block_hash: Hash
  height: number
  internal_source: boolean
  source_tx_hash: Hash
  source_tx_type: string
  tx: CallTx
}

export type Auction = {
  height: number
  marketplace: Account
  collection: Account
  token: TokenId
  price: number
}

export const WALLET="ak_ZzSn4fxw1VUfiiZmwtVi8pHaLVsMj8HerNZ1L9nmwFF4vvccd"
export const MARKETPLACE = "ct_2TSMsytURDWTnXtTwCnMhBAwP6epq3DT98Fe9GXksszwKn3Z6V"
const MIDDLEWARE_URL = "https://testnet.aeternity.io/mdw"

export const getMetainfo = async (contractId: Account): Promise<Response<Metainfo>> => {
  const response = await fetch(`${MIDDLEWARE_URL}/v2/aex141/${contractId}`)
  const content = await response.json()
  if (response.ok) {
    return { success: true, data: content}
  } else {
    return { success: false, error: content.error }
  }
}

export const getMetadata = async (contractId: Account, tokenId : TokenId): Promise<Response<Metadata>> => {
  const response = await fetch(`${MIDDLEWARE_URL}/v2/aex141/${contractId}/metadata/${tokenId}`)
  const content = await response.json()
  if (response.ok) {
    return { success: true, data: content.data }
  } else {
    return { success: false, error: content.error }
  }
}

export const getAccountNfts = async (accountId: Account): Promise<Response<Array<Nft>>> => {
  const response = await fetch(`${MIDDLEWARE_URL}/v2/aex141/owned-nfts/${accountId}`)
  const content = await response.json()
  if (response.ok) {
    return { success: true, data: content.data}
  } else {
    return { success: false, error: content.error }
  }
}

export const getAuctions = async (accountId: Account): Promise<Response<Array<Auction>>> => {
  const nfts = await getAccountNfts(accountId)
  const response = await fetch(`${MIDDLEWARE_URL}/v2/entities/nft_auction?contract=${MARKETPLACE}`)
  const content = await response.json()

  if (response.ok) {
    let auctions = content.data.map((auction: ResponseAuction) => {
      return {
        height: auction.height,
        marketplace: auction.tx.contract_id,
        collection: auction.tx.arguments[0].value,
        token: auction.tx.arguments[1].value,
        price: auction.tx.arguments[2].value
      }
    }).filter((auction : Auction) => {
      if (nfts.success) {
        const found = nfts.data.findIndex((nft : Nft) => nft.contract_id === auction.collection && nft.token_id === auction.token)
        return found !== -1
      } else {
        return true
      }
    });

    return { success: true, data: auctions }
  } else {
    return { success: false, error: content.error }
  }
}
