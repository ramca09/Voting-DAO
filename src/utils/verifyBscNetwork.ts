import { ChainId } from '@pancakeswap/sdk'

export const verifyEtheremNetwork = (chainId: number) => {
  return chainId === ChainId.GOERLI || chainId === ChainId.ETHEREUM
}
