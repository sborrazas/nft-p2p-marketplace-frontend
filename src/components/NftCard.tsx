import { Metadata } from "../middleware"

import "./NftCard.css"

export type Props = {
  contractId: string
  tokenId: number
  metadata: Metadata
}

export default function NftCard({ contractId, tokenId, metadata }: Props) {
  return (
    <div className="NftCard">
      <div className="NftCard-contract">Contract: {contractId}</div>
      <div className="NftCard-token">Token ID: {tokenId}</div>
      <div className="NftCard-metadata">
        {
          (typeof metadata === 'string' && metadata) ||
          (typeof metadata === 'object' && 'map' in metadata && `Metadata map: ${JSON.stringify(metadata.map)}`) ||
          (typeof metadata === 'object' && 'url' in metadata && `Metadata URL: ${metadata.url}`)
        }
      </div>
    </div>
  )
}
