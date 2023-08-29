import { load as loadWallet, loadSuccess as loadWalletSuccess } from "./slices/walletSlice"
import { getWallet } from "./aeternity"

export function connectToWallet(dispatch: (action: any) => void) {
  return async () => {
    const wallet = await getWallet()

    dispatch(loadWallet())
    dispatch(loadWalletSuccess({ wallet }))
  }
}
