import { ChainId, Token, WETH9 } from '@pancakeswap/sdk'
import { USDC_GOERLI } from './common'

export const goerliTestnetTokens = {
  weth: WETH9[ChainId.BSC],
  celr: new Token(ChainId.BSC, '0x5D3c0F4cA5EE99f8E8F59Ff9A5fAb04F6a7e007f', 18, 'CELR', 'CelerToken', ''),
  leet: new Token(ChainId.BSC, '0xBd509651E6374c327d24b9d7E3Ea46704f6F31E8', 18, 'LEET', 'Leet Token', ''),
  usdc: USDC_GOERLI,
  // Slav link: new Token(ChainId.GOERLI, '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', 18, 'LINK', 'Goerli LINK', ''),
  prvtx: new Token(ChainId.GOERLI, '0x236680EaFCcc68EeD84724eC04F188136187F9EA', 18, 'PRVTX', 'Goerli PRVTX', ''),
}
