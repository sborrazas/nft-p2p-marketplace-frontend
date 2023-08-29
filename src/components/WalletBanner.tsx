import { useAppDispatch } from "../hooks"
import Button from "../components/Button";
import Banner, { Paragraph as BannerParagraph } from "../components/Banner";
import { connectToWallet } from "../utils"

export default function WalletBanner() {
  const dispatch = useAppDispatch()

  return (
    <Banner>
      <BannerParagraph>To list your NFTs, you need to connect to the wallet first.</BannerParagraph>
      <Button cta onClick={connectToWallet(dispatch)}>Connect to wallet</Button>
    </Banner>
  )
}
