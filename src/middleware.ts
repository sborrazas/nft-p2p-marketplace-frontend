type Response<T> = {
  success: true
  data: T
}
| {
  success: false
  error: string
}

export type Account = string
export type TokenId = number
export type Nft = {
  contract_id: Account,
  owner_id: Account,
  token_id: TokenId
}

const MIDDLEWARE_URL = "https://testnet.aeternity.io/mdw"

export const getAccountNfts = async (accountId: Account): Promise<Response<Array<Nft>>> => {
  const response = await fetch(`${MIDDLEWARE_URL}/v2/aex141/owned-nfts/${accountId}`)
  const content = await response.json()
  if (response.ok) {
    return { success: true, data: content.data }
  } else {
    return { success: false, error: content.error }
  }
}
