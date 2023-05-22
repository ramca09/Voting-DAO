const votePowerAddress = '0x4568979a14aD4073Ab2748f994a47D2eC398D8b0'

export const cakeBalanceStrategy = () => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress,
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getCakeBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})
