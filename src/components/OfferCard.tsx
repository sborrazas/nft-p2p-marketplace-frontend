import "./OfferCard.css"

export type Props = {
  contractId: string
  contractName: string
  tokenId: number
  tokenName: string
  account: string
  value: number
}

export default function OfferCard({ contractId, contractName, tokenId, tokenName, account, value }: Props) {
  return (
    <div className="OfferCard">
      <div className="OfferCard-contract">{contractName} - {contractId}</div>
      <div className="OfferCard-token">{tokenName} - {tokenId}</div>
      <div className="OfferCard-bid">{value} by {account}</div>
    </div>
  )
}