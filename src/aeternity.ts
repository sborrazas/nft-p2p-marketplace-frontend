import {
  AeSdkAepp,
  Node,
  BrowserWindowMessageConnection,
  walletDetector,
  CompilerHttp,
  SUBSCRIPTION_TYPES,
  Encoded
} from "@aeternity/aepp-sdk"

const aeSdk = new AeSdkAepp({
  name: "AEPP",
  nodes: [{
    name: "testnet",
    instance: new Node("https://testnet.aeternity.io"),
  }],
  onCompiler: new CompilerHttp("https://compiler.aepps.com")
})

export async function getWallet(): Promise<Encoded.AccountAddress> {
  console.log("GETTING WALLET")
  const foundWallet: any = await new Promise((resolve) => {
    const handleWallets = async ({ newWallet }: any) => {
      stopScan()
      resolve(newWallet)
    }
    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  })

  const walletInfo = await aeSdk.connectToWallet(foundWallet.getConnection())
  const subscribeAddress = await aeSdk.subscribeAddress("subscribe" as SUBSCRIPTION_TYPES, "current")
  console.log("WALLET INFO", walletInfo, subscribeAddress)

  return Object.keys(subscribeAddress.address.current)[0] as Encoded.AccountAddress
}
