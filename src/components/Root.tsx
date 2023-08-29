import { PropsWithChildren } from "react"
import Layout from "./Layout"
import Header from "./Header"
import logo from "../assets/logo.svg"
import { connectToWallet } from "../utils"

import { useAppDispatch, useAppSelector } from "../hooks"
import { selectWallet } from "../slices/walletSlice"

export type Props = PropsWithChildren & {
  isLanding?: boolean
  title?: string
}

export default function Root({ children, isLanding, title }: Props) {
  const dispatch = useAppDispatch()
  const wallet = useAppSelector(selectWallet)

  const fullTitle = title ? `${title} - NAFTA - æternity NFT Marketplace` : "NAFTA - æternity NFT Marketplace";

  return (
    <Layout isLanding={isLanding} logoSrc={logo} title={fullTitle} wallet={wallet.wallet} onWalletConnect={connectToWallet(dispatch)}>
      {title && <Header>{title}</Header>}
      {children}
    </Layout>
  )
}
