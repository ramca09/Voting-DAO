import snapshot from '@snapshot-labs/snapshot.js'

// eslint-disable-next-line consistent-return
export async function getScores(
  space: string,
  strategies: any[],
  network: string,
  addresses: string[],
  blockNumber: number | string = 'latest',
) {
  try {
    const scores = await snapshot.utils.getScores(space, strategies, network, addresses, blockNumber)
    return scores
  } catch (e) {
    return Promise.reject(e)
  }
}
