import "./Landing.css"

export default function Landing() {
  return (
    <div className="Landing">
      <header className="Landing-header">
        <h2 className="Landing-title">Powerful NFT trading for everyone</h2>
        <h3 className="Landing-subtitle">Efficiently manage, transfer, and showcase your assets. Elevate your NFT management experience with the ultimate peer-to-peer interactions.</h3>
      </header>

      <section className="Landing-section">
        <img src="landing-1.png" />
      </section>
      <section className="Landing-section">
        <p className="Landing-paragraph">Buy, sell and trade your NFTs with anyone</p>
        <img src="landing-2.png" />
      </section>
    </div>
  )
}
