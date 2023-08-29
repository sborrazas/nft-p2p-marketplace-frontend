import { PropsWithChildren } from "react"
import "./Layout.css"
import { Link as RouterLink } from "react-router-dom"
import Link from "./Link"
import Button from "./Button"

export type Props = PropsWithChildren & {
  isLanding?: boolean
  logoSrc: string
  title: string
  wallet?: string | null
  onWalletConnect: () => void
}

function LayoutInnerContent({ children }: PropsWithChildren) {
  return (
    <div className="Layout-innerContent">{children}</div>
  )
}

function cropWallet(address: string) {
  const a = `${address.slice(0, 6)}...${address.slice(-3)}`
  console.log(a)
  return a
}

export default function Layout({ children, logoSrc, title, isLanding, wallet,onWalletConnect }: Props) {
  return (
    <div className="Layout">
      <header className="Layout-header">
        <LayoutInnerContent>
          <div className="Layout-headerWrapper">
            <RouterLink to="/" className="Layout-headerLogo">
              <img className="Layout-headerLogo" src={logoSrc} alt={title} />
            </RouterLink>

            <h1 className="Layout-headerTitle">NAFTA</h1>

            <nav className="Layout-headerNav">
              <ul className="Layout-headerNavList">
                <li className="Layout-headerNavItem"><Link to="/">Overview</Link></li>
                <li className="Layout-headerNavItem"><Link to="/auctions">My Auctions</Link></li>
                <li className="Layout-headerNavItem"><Link to="/nfts">My NFTs</Link></li>
                <li className="Layout-headerNavItem"><Link to="/all-auctions">All Auctions</Link></li>
              </ul>
            </nav>

            <div className="Layout-headerAside">{wallet ? `Wallet: ${cropWallet(wallet)}` : (<Button onClick={() => onWalletConnect()}>Connect to wallet</Button>)}</div>
          </div>
        </LayoutInnerContent>
      </header>
      <section className="Layout-content">
        <LayoutInnerContent>
          {children}
        </LayoutInnerContent>
      </section>
      <footer className="Layout-footer">
        <LayoutInnerContent>
          Made by <Link to="https://github.com/sborrazas">@sborrazas</Link> and <Link to="https://github.com/jyeshe">@jyeshe</Link> on the <Link to="https://www.aeternity-foundation.org/">æternity Crypto Foundation</Link>
        </LayoutInnerContent>
      </footer>
    </div>
  )
}
