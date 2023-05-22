import { /* Button, */ ButtonProps } from '@pancakeswap/uikit'
import { useWallet } from 'hooks/useWallet'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import Trans from './Trans'

const ConnectWalletButton = ({ children /* , ...props */ }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }

  return (
    // <Button onClick={handleClick} {...props}>
    //   {children || <Trans>Connect Wallet</Trans>}
    // </Button>
    <button
      type="button"
      onClick={handleClick}
      className="button block button-gradient border-2 border-white ml-3 px-3 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
    >
      {children || <Trans>Connect Wallet</Trans>}
    </button>
  )
}

export default ConnectWalletButton
