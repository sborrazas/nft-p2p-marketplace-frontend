import "./NftCard.css"

export type Props = {
  contractId: string
  contractName: string
  tokenId: number
  tokenName: string
  mediaUrl: string
}

export default function NftCard({ contractId, contractName, tokenId, tokenName, mediaUrl }: Props) {
  return (
    <div className="NftCard">
      <div className="NftCard-contract">{contractName} - {contractId}</div>
      <div className="NftCard-token">{tokenName} - {tokenId}</div>
      <div className="NftCard-image">
        <img src={mediaUrl} alt={tokenId.toString()}/>
      </div>
    </div>
  )
}