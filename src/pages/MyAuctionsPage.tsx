import React, { useState, useEffect } from 'react';
import { WALLET, getAuctions, Auction } from "../middleware"

export default function MyAuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    getAuctions(WALLET)
      .then((response) => {
        if (response.success) {
          setAuctions(response.data)
        } else {
          setAuctions([])
        }
      });
  }, []);

  return (
    <ul>
      {auctions.map((auction : Auction) => {
          const collection = auction.collection
          const token = auction.token
          return (
            <li key={`${collection}-${token}`}>Collection: {collection}, Token: {token}, Price: {auction.price} </li>
          )
        })}
    </ul>
  );
}