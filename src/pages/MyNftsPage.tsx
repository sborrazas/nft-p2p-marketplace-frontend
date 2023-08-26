import React, { useState, useEffect } from 'react';
import { WALLET, getAccountNfts, getMetadata, Metadata, Nft, Account, TokenId } from "../middleware"

export type NftAndMetadata = {
  collection: Account,
  metadata: Metadata,
  token: TokenId,
}

export default function MyNftsPage() {
  const [nfts, setNfts] = useState<NftAndMetadata[]>([]);

  useEffect(() => {
    const loadNfts = async () => {
      const response = await getAccountNfts(WALLET)
      if (response.success) {
        return response.data
      } else {
        console.log("Failed to fetch NFTs");
        return []
      }
    }

    const loadMetadata = async (nft : Nft) => {
      const response = await getMetadata(nft.contract_id, nft.token_id)
      
      if (response.success) {
        return response.data
      } else {
        console.log("Failed to fetch Metadata");
        return {map: null}
      }
    }

    const load = async () => {
      const nfts = await loadNfts();
      const nftsAndMetadata = await Promise.all(nfts.map(async (nft): Promise<NftAndMetadata> => {
        const metadata = await loadMetadata(nft);
    
        return {
            collection: nft.contract_id,
            metadata: metadata,
            token: nft.token_id
          }
      }));

      setNfts(nftsAndMetadata)
    }

    void load()
  }, []);

  return (
    <table>
      <thead>
      <tr>
        <td>Collection</td>
        <td>Token Id</td>
        <td>Metadata</td>
      </tr>
      </thead>
      <tbody>
      {
        nfts.map(({collection, metadata, token} : NftAndMetadata) => {
          console.log(metadata)
          return (
            <tr key={`${collection}-${token}`}>
              <td>{collection}</td>
              <td>{token}</td>
              <td>{JSON.stringify(metadata)}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  );
}