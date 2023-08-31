import type { AeSdkBase, ContractMethodsBase } from "@aeternity/aepp-sdk";
import type ContractWithMethods from "@aeternity/aepp-sdk/es/contract/Contract";

import {MARKETPLACE, Nft, NftAndMetadata}  from "./middleware";
import MARKETPLACE_ACI from "./marketplace-aci.json";

import { AeSdkAepp, Node, CompilerHttp } from "@aeternity/aepp-sdk"

export type Account = string

export type Offer = {
  bidAccount: Account
  bidValue: number
}

export type NftAndOffer = NftAndMetadata & Offer

type NftOfferKey = {collection: Account, token_id: number}

export class Marketplace {
  contract: ContractWithMethods<ContractMethodsBase>;
  aeSdk: AeSdkBase;

  // private instance?: ContractWithMethods<ContractMethodsBase>;
  // protected tokenContractAddress?: Encoded.ContractAddress;

  constructor(
    contract: ContractWithMethods<ContractMethodsBase>,
    aeSdk: AeSdkBase
  ) {
    this.contract = contract;
    this.aeSdk = aeSdk;
  }

  async getOffer(nft : Nft): Promise<Offer> {
    const res = await this.contract.get_offer(nft.contract_id, nft.token_id)

    if (res.result?.returnType === "ok") {
      const [value, account] = res.decodedResult;
      return {bidAccount: account, bidValue: value.toString()}
    } else {
      return {bidAccount: "ak_", bidValue: -1}
    }
  }

  async getOfferFromOffers(nft : Nft): Promise<Offer> {
    const call = await this.contract.get_offers()
    let offer = {bidAccount: "ak_", bidValue: -1}

    if (call.result?.returnType === "ok") {
      const offersKeys : Array<NftOfferKey> = Array.from(call.decodedResult.keys());
      console.log(offersKeys)
      let offerKey = offersKeys.find((key : NftOfferKey) => {
        return key.collection === nft.contract_id && key.token_id.toString() === nft.token_id.toString()
      })
      
      if (typeof offerKey === "object") {
        const nftOffers = call.decodedResult
        const [value, account] = nftOffers.get(offerKey)
        offer = {bidAccount: account, bidValue: value.toString()}
      }
    }

    return offer
  }
      
  async putListing(nft : Nft, price: number): Promise<Offer> {
    const res = await this.contract.put_listing(nft.contract_id, nft.token_id, price)

    if (res.result?.returnType === "ok") {
      const [value, account] = res.decodedResult;
      return {bidAccount: account, bidValue: value.toString()}
    } else {
      return {bidAccount: "ak_", bidValue: -1}
    }
  }
}

export const getMarketplaceInstance = async() => {
  const aeSdk = new AeSdkAepp({
    name: "AEPP",
    nodes: [{
      name: "testnet",
      instance: new Node("https://testnet.aeternity.io"),
    }],
    onCompiler: new CompilerHttp("https://compiler.aepps.com")
  })
  const contract = await marketplaceContract(aeSdk)
  
  return new Marketplace(contract, aeSdk)
}

const marketplaceContract = async(
  aeSdk: AeSdkBase,
): Promise<ContractWithMethods<ContractMethodsBase>> => {
  return aeSdk.initializeContract({
    aci: MARKETPLACE_ACI,
    address: MARKETPLACE,
  });
}