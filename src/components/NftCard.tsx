import "./NftCard.css"

export type Props = {
  bidAccount: string
  bidValue: number
  contractId: string
  contractName: string
  tokenId: number
  tokenName: string
  mediaUrl: string
}

export default function NftCard({ contractId, contractName, tokenId, tokenName, mediaUrl, bidAccount, bidValue }: Props) {
  return (
    <div className="NftCard">
      <div className="NftCard-contract">{contractName} - {contractId}</div>
      <div className="NftCard-token">{tokenName} - {tokenId}</div>
      {renderBid(bidAccount, bidValue)}
      <div className="NftCard-image">
        <img src={mediaUrl} alt={tokenId.toString()}/>
      </div>
    </div>
  )
}

function renderBid(bidAccount: string, bidValue: number) {
  if (bidValue !== -1) {
    return (<div className="NftCard-bid">{bidValue} by {bidAccount}</div>)  
  } else {
    return (<div className="NftCard-bid"></div>)
  }
}