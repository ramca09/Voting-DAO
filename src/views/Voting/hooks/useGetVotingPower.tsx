import { useWeb3React } from '@pancakeswap/wagmi'
import { FetchStatus } from 'config/constants/types'
import useSWRImmutable from 'swr/immutable'
import { bscRpcProvider } from 'utils/providers'
import { getVotingPowerByCakeStrategy } from '../helpers'

interface State {
  cakeBalance?: number
}

const useGetVotingPower = (block?: number, isActive = true): State & { isLoading: boolean; isError: boolean } => {
  const { account } = useWeb3React()
  const { data, status, error } = useSWRImmutable(
    account && isActive ? [account, block, 'votingPower'] : null,
    async () => {
      const blockNumber = block || (await bscRpcProvider.getBlockNumber())
      const balance = await getVotingPowerByCakeStrategy([account], blockNumber)
      return balance
    },
  )
  if (error) console.error(error)
  return {
    cakeBalance: data?.[account],
    isLoading: status !== FetchStatus.Fetched,
    isError: status === FetchStatus.Failed,
  }
}

export default useGetVotingPower
