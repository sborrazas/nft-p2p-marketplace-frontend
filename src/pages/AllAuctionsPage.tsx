import React, { useState, useEffect } from 'react';
import { getAuctions, Auction } from "../middleware"
import Root from '../components/Root';

export default function AllAuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    getAuctions("")
      .then((response) => {
        if (response.success) {
          setAuctions(response.data)
        } else {
          setAuctions([])
        }
      });
  }, []);

  return (
    <Root title="All Auctions">
      <ul>
        {auctions.map((auction : Auction) => {
            const collection = auction.collection
            const token = auction.token
            return (
              <li key={`${collection}-${token}`}>Collection: {collection}, Token: {token}, Price: {auction.price} </li>
            )
          })}
      </ul>
    </Root>
  );
}
