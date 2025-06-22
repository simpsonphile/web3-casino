import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blackjack
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const blackjackAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_mainContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'status',
        internalType: 'enum Blackjack.GameStatus',
        type: 'uint8',
        indexed: true,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '', internalType: 'uint8[]', type: 'uint8[]', indexed: false },
      { name: '', internalType: 'uint8[]', type: 'uint8[]', indexed: false },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'GameUpdated',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'bet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'hand', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'countPoints',
    outputs: [{ name: 'totalPoints', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'doubleDown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'emitCurrentGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBankPoints',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentGame',
    outputs: [
      {
        name: 'game',
        internalType: 'struct Blackjack.Game',
        type: 'tuple',
        components: [
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'bankHand', internalType: 'uint8[]', type: 'uint8[]' },
          { name: 'playerHand', internalType: 'uint8[]', type: 'uint8[]' },
          { name: 'deck', internalType: 'uint8[52]', type: 'uint8[52]' },
          { name: 'deckTopIndex', internalType: 'uint8', type: 'uint8' },
          {
            name: 'status',
            internalType: 'enum Blackjack.GameStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPlayerPoints',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mainContractAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pass',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const blackjackAddress = {
  31337: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
} as const

/**
 *
 */
export const blackjackConfig = {
  address: blackjackAddress,
  abi: blackjackAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Casino
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const casinoAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GameAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'NATIVE_TO_CHIP_RATE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newSubownerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addSubOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addToAddressBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'casinoToken',
    outputs: [
      { name: '', internalType: 'contract ICasinoCoin', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'getBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCasinoBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getFromAddressBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getSubowners',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const casinoAddress = {
  31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
} as const

/**
 *
 */
export const casinoConfig = { address: casinoAddress, abi: casinoAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CasinoCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const casinoCoinAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const casinoCoinAddress = {
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
} as const

/**
 *
 */
export const casinoCoinConfig = {
  address: casinoCoinAddress,
  abi: casinoCoinAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Burnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20BurnableAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICasino
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCasinoAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addToAddressBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCasinoBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getFromAddressBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICasinoCoin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCasinoCoinAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Plinko
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const plinkoAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_mainContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'multipliers',
        internalType: 'uint16[]',
        type: 'uint16[]',
        indexed: false,
      },
      {
        name: '',
        internalType: 'enum Plinko.Difficulty',
        type: 'uint8',
        indexed: false,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetBatchFinish',
  },
  {
    type: 'function',
    inputs: [
      { name: 'betAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'betCount', internalType: 'uint8', type: 'uint8' },
      {
        name: 'difficulty',
        internalType: 'enum Plinko.Difficulty',
        type: 'uint8',
      },
    ],
    name: 'batchBets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'enum Plinko.Difficulty', type: 'uint8' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'difficultyLevels',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'max', internalType: 'uint32', type: 'uint32' },
      { name: 'nonce', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'getRandomNumber',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mainContractAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const plinkoAddress = {
  31337: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
} as const

/**
 *
 */
export const plinkoConfig = { address: plinkoAddress, abi: plinkoAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Slots
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const slotsAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_mainContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '', internalType: 'uint8', type: 'uint8', indexed: false },
      { name: '', internalType: 'uint8', type: 'uint8', indexed: false },
      { name: '', internalType: 'uint8', type: 'uint8', indexed: false },
      {
        name: 'status',
        internalType: 'enum Slots.GameStatus',
        type: 'uint8',
        indexed: true,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'GameFinished',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'bet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mainContractAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const slotsAddress = {
  31337: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
} as const

/**
 *
 */
export const slotsConfig = { address: slotsAddress, abi: slotsAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__
 *
 *
 */
export const useReadBlackjack = /*#__PURE__*/ createUseReadContract({
  abi: blackjackAbi,
  address: blackjackAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"countPoints"`
 *
 *
 */
export const useReadBlackjackCountPoints = /*#__PURE__*/ createUseReadContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'countPoints',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"getBankPoints"`
 *
 *
 */
export const useReadBlackjackGetBankPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'getBankPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"getCurrentGame"`
 *
 *
 */
export const useReadBlackjackGetCurrentGame =
  /*#__PURE__*/ createUseReadContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'getCurrentGame',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"getPlayerPoints"`
 *
 *
 */
export const useReadBlackjackGetPlayerPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'getPlayerPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"mainContractAddress"`
 *
 *
 */
export const useReadBlackjackMainContractAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'mainContractAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadBlackjackOwner = /*#__PURE__*/ createUseReadContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__
 *
 *
 */
export const useWriteBlackjack = /*#__PURE__*/ createUseWriteContract({
  abi: blackjackAbi,
  address: blackjackAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"bet"`
 *
 *
 */
export const useWriteBlackjackBet = /*#__PURE__*/ createUseWriteContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'bet',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"doubleDown"`
 *
 *
 */
export const useWriteBlackjackDoubleDown = /*#__PURE__*/ createUseWriteContract(
  { abi: blackjackAbi, address: blackjackAddress, functionName: 'doubleDown' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"emitCurrentGame"`
 *
 *
 */
export const useWriteBlackjackEmitCurrentGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'emitCurrentGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"hit"`
 *
 *
 */
export const useWriteBlackjackHit = /*#__PURE__*/ createUseWriteContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'hit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"pass"`
 *
 *
 */
export const useWriteBlackjackPass = /*#__PURE__*/ createUseWriteContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'pass',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__
 *
 *
 */
export const useSimulateBlackjack = /*#__PURE__*/ createUseSimulateContract({
  abi: blackjackAbi,
  address: blackjackAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"bet"`
 *
 *
 */
export const useSimulateBlackjackBet = /*#__PURE__*/ createUseSimulateContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'bet',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"doubleDown"`
 *
 *
 */
export const useSimulateBlackjackDoubleDown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'doubleDown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"emitCurrentGame"`
 *
 *
 */
export const useSimulateBlackjackEmitCurrentGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blackjackAbi,
    address: blackjackAddress,
    functionName: 'emitCurrentGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"hit"`
 *
 *
 */
export const useSimulateBlackjackHit = /*#__PURE__*/ createUseSimulateContract({
  abi: blackjackAbi,
  address: blackjackAddress,
  functionName: 'hit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blackjackAbi}__ and `functionName` set to `"pass"`
 *
 *
 */
export const useSimulateBlackjackPass = /*#__PURE__*/ createUseSimulateContract(
  { abi: blackjackAbi, address: blackjackAddress, functionName: 'pass' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blackjackAbi}__
 *
 *
 */
export const useWatchBlackjackEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: blackjackAbi, address: blackjackAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blackjackAbi}__ and `eventName` set to `"GameUpdated"`
 *
 *
 */
export const useWatchBlackjackGameUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blackjackAbi,
    address: blackjackAddress,
    eventName: 'GameUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__
 *
 *
 */
export const useReadCasino = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"NATIVE_TO_CHIP_RATE"`
 *
 *
 */
export const useReadCasinoNativeToChipRate =
  /*#__PURE__*/ createUseReadContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'NATIVE_TO_CHIP_RATE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"casinoToken"`
 *
 *
 */
export const useReadCasinoCasinoToken = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'casinoToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getBalance"`
 *
 *
 */
export const useReadCasinoGetBalance = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'getBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getBalanceOf"`
 *
 *
 */
export const useReadCasinoGetBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'getBalanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getCasinoBalance"`
 *
 *
 */
export const useReadCasinoGetCasinoBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'getCasinoBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getSubowners"`
 *
 *
 */
export const useReadCasinoGetSubowners = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'getSubowners',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadCasinoOwner = /*#__PURE__*/ createUseReadContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__
 *
 *
 */
export const useWriteCasino = /*#__PURE__*/ createUseWriteContract({
  abi: casinoAbi,
  address: casinoAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"addSubOwner"`
 *
 *
 */
export const useWriteCasinoAddSubOwner = /*#__PURE__*/ createUseWriteContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'addSubOwner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"addToAddressBalance"`
 *
 *
 */
export const useWriteCasinoAddToAddressBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'addToAddressBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"deposit"`
 *
 *
 */
export const useWriteCasinoDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getFromAddressBalance"`
 *
 *
 */
export const useWriteCasinoGetFromAddressBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'getFromAddressBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"withdraw"`
 *
 *
 */
export const useWriteCasinoWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: casinoAbi,
  address: casinoAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__
 *
 *
 */
export const useSimulateCasino = /*#__PURE__*/ createUseSimulateContract({
  abi: casinoAbi,
  address: casinoAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"addSubOwner"`
 *
 *
 */
export const useSimulateCasinoAddSubOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'addSubOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"addToAddressBalance"`
 *
 *
 */
export const useSimulateCasinoAddToAddressBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'addToAddressBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"deposit"`
 *
 *
 */
export const useSimulateCasinoDeposit = /*#__PURE__*/ createUseSimulateContract(
  { abi: casinoAbi, address: casinoAddress, functionName: 'deposit' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"getFromAddressBalance"`
 *
 *
 */
export const useSimulateCasinoGetFromAddressBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'getFromAddressBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoAbi}__ and `functionName` set to `"withdraw"`
 *
 *
 */
export const useSimulateCasinoWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoAbi,
    address: casinoAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoAbi}__
 *
 *
 */
export const useWatchCasinoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: casinoAbi,
  address: casinoAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoAbi}__ and `eventName` set to `"Deposit"`
 *
 *
 */
export const useWatchCasinoDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoAbi,
    address: casinoAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoAbi}__ and `eventName` set to `"GameAdded"`
 *
 *
 */
export const useWatchCasinoGameAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoAbi,
    address: casinoAddress,
    eventName: 'GameAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoAbi}__ and `eventName` set to `"Withdraw"`
 *
 *
 */
export const useWatchCasinoWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoAbi,
    address: casinoAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__
 *
 *
 */
export const useReadCasinoCoin = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"allowance"`
 *
 *
 */
export const useReadCasinoCoinAllowance = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"balanceOf"`
 *
 *
 */
export const useReadCasinoCoinBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"decimals"`
 *
 *
 */
export const useReadCasinoCoinDecimals = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"name"`
 *
 *
 */
export const useReadCasinoCoinName = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadCasinoCoinOwner = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"symbol"`
 *
 *
 */
export const useReadCasinoCoinSymbol = /*#__PURE__*/ createUseReadContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"totalSupply"`
 *
 *
 */
export const useReadCasinoCoinTotalSupply = /*#__PURE__*/ createUseReadContract(
  {
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'totalSupply',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__
 *
 *
 */
export const useWriteCasinoCoin = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"approve"`
 *
 *
 */
export const useWriteCasinoCoinApprove = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const useWriteCasinoCoinBurn = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"burnFrom"`
 *
 *
 */
export const useWriteCasinoCoinBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"mint"`
 *
 *
 */
export const useWriteCasinoCoinMint = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useWriteCasinoCoinRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transfer"`
 *
 *
 */
export const useWriteCasinoCoinTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 *
 */
export const useWriteCasinoCoinTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useWriteCasinoCoinTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__
 *
 *
 */
export const useSimulateCasinoCoin = /*#__PURE__*/ createUseSimulateContract({
  abi: casinoCoinAbi,
  address: casinoCoinAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"approve"`
 *
 *
 */
export const useSimulateCasinoCoinApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"burn"`
 *
 *
 */
export const useSimulateCasinoCoinBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"burnFrom"`
 *
 *
 */
export const useSimulateCasinoCoinBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"mint"`
 *
 *
 */
export const useSimulateCasinoCoinMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useSimulateCasinoCoinRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transfer"`
 *
 *
 */
export const useSimulateCasinoCoinTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transferFrom"`
 *
 *
 */
export const useSimulateCasinoCoinTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link casinoCoinAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useSimulateCasinoCoinTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoCoinAbi}__
 *
 *
 */
export const useWatchCasinoCoinEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoCoinAbi}__ and `eventName` set to `"Approval"`
 *
 *
 */
export const useWatchCasinoCoinApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoCoinAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const useWatchCasinoCoinOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link casinoCoinAbi}__ and `eventName` set to `"Transfer"`
 *
 *
 */
export const useWatchCasinoCoinTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: casinoCoinAbi,
    address: casinoCoinAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__
 */
export const useReadErc20Burnable = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20BurnableAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20BurnableAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BurnableBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20BurnableAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20BurnableDecimals = /*#__PURE__*/ createUseReadContract(
  { abi: erc20BurnableAbi, functionName: 'decimals' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20BurnableName = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20BurnableSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20BurnableAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20BurnableTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: erc20BurnableAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__
 */
export const useWriteErc20Burnable = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20BurnableApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20BurnableAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteErc20BurnableBurn = /*#__PURE__*/ createUseWriteContract({
  abi: erc20BurnableAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteErc20BurnableBurnFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20BurnableAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20BurnableTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20BurnableAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20BurnableTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20BurnableAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__
 */
export const useSimulateErc20Burnable = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20BurnableAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20BurnableApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20BurnableAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateErc20BurnableBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20BurnableAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateErc20BurnableBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20BurnableAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20BurnableTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20BurnableAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20BurnableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20BurnableTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20BurnableAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableAbi}__
 */
export const useWatchErc20BurnableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20BurnableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20BurnableApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20BurnableAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20BurnableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20BurnableTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20BurnableAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoAbi}__
 */
export const useReadICasino = /*#__PURE__*/ createUseReadContract({
  abi: iCasinoAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"getBalanceOf"`
 */
export const useReadICasinoGetBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: iCasinoAbi,
  functionName: 'getBalanceOf',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoAbi}__
 */
export const useWriteICasino = /*#__PURE__*/ createUseWriteContract({
  abi: iCasinoAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"addToAddressBalance"`
 */
export const useWriteICasinoAddToAddressBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCasinoAbi,
    functionName: 'addToAddressBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"getCasinoBalance"`
 */
export const useWriteICasinoGetCasinoBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCasinoAbi,
    functionName: 'getCasinoBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"getFromAddressBalance"`
 */
export const useWriteICasinoGetFromAddressBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCasinoAbi,
    functionName: 'getFromAddressBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoAbi}__
 */
export const useSimulateICasino = /*#__PURE__*/ createUseSimulateContract({
  abi: iCasinoAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"addToAddressBalance"`
 */
export const useSimulateICasinoAddToAddressBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoAbi,
    functionName: 'addToAddressBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"getCasinoBalance"`
 */
export const useSimulateICasinoGetCasinoBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoAbi,
    functionName: 'getCasinoBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoAbi}__ and `functionName` set to `"getFromAddressBalance"`
 */
export const useSimulateICasinoGetFromAddressBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoAbi,
    functionName: 'getFromAddressBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoCoinAbi}__
 */
export const useReadICasinoCoin = /*#__PURE__*/ createUseReadContract({
  abi: iCasinoCoinAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadICasinoCoinAllowance = /*#__PURE__*/ createUseReadContract({
  abi: iCasinoCoinAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadICasinoCoinBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: iCasinoCoinAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadICasinoCoinTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: iCasinoCoinAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__
 */
export const useWriteICasinoCoin = /*#__PURE__*/ createUseWriteContract({
  abi: iCasinoCoinAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteICasinoCoinApprove = /*#__PURE__*/ createUseWriteContract({
  abi: iCasinoCoinAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteICasinoCoinBurnFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: iCasinoCoinAbi, functionName: 'burnFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteICasinoCoinMint = /*#__PURE__*/ createUseWriteContract({
  abi: iCasinoCoinAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteICasinoCoinTransfer = /*#__PURE__*/ createUseWriteContract(
  { abi: iCasinoCoinAbi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteICasinoCoinTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCasinoCoinAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__
 */
export const useSimulateICasinoCoin = /*#__PURE__*/ createUseSimulateContract({
  abi: iCasinoCoinAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateICasinoCoinApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoCoinAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateICasinoCoinBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoCoinAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateICasinoCoinMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoCoinAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateICasinoCoinTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoCoinAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateICasinoCoinTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCasinoCoinAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iCasinoCoinAbi}__
 */
export const useWatchICasinoCoinEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iCasinoCoinAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchICasinoCoinApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iCasinoCoinAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iCasinoCoinAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchICasinoCoinTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iCasinoCoinAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useReadIerc20 = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWriteIerc20 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useSimulateIerc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: ierc20Abi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWatchIerc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__
 *
 *
 */
export const useReadPlinko = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"difficultyLevels"`
 *
 *
 */
export const useReadPlinkoDifficultyLevels =
  /*#__PURE__*/ createUseReadContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'difficultyLevels',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"getRandomNumber"`
 *
 *
 */
export const useReadPlinkoGetRandomNumber = /*#__PURE__*/ createUseReadContract(
  { abi: plinkoAbi, address: plinkoAddress, functionName: 'getRandomNumber' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"mainContractAddress"`
 *
 *
 */
export const useReadPlinkoMainContractAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'mainContractAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadPlinkoOwner = /*#__PURE__*/ createUseReadContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__
 *
 *
 */
export const useWritePlinko = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"batchBets"`
 *
 *
 */
export const useWritePlinkoBatchBets = /*#__PURE__*/ createUseWriteContract({
  abi: plinkoAbi,
  address: plinkoAddress,
  functionName: 'batchBets',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__
 *
 *
 */
export const useSimulatePlinko = /*#__PURE__*/ createUseSimulateContract({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link plinkoAbi}__ and `functionName` set to `"batchBets"`
 *
 *
 */
export const useSimulatePlinkoBatchBets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: plinkoAbi,
    address: plinkoAddress,
    functionName: 'batchBets',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__
 *
 *
 */
export const useWatchPlinkoEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: plinkoAbi,
  address: plinkoAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link plinkoAbi}__ and `eventName` set to `"BetBatchFinish"`
 *
 *
 */
export const useWatchPlinkoBetBatchFinishEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: plinkoAbi,
    address: plinkoAddress,
    eventName: 'BetBatchFinish',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link slotsAbi}__
 *
 *
 */
export const useReadSlots = /*#__PURE__*/ createUseReadContract({
  abi: slotsAbi,
  address: slotsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link slotsAbi}__ and `functionName` set to `"mainContractAddress"`
 *
 *
 */
export const useReadSlotsMainContractAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: slotsAbi,
    address: slotsAddress,
    functionName: 'mainContractAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link slotsAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadSlotsOwner = /*#__PURE__*/ createUseReadContract({
  abi: slotsAbi,
  address: slotsAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link slotsAbi}__
 *
 *
 */
export const useWriteSlots = /*#__PURE__*/ createUseWriteContract({
  abi: slotsAbi,
  address: slotsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link slotsAbi}__ and `functionName` set to `"bet"`
 *
 *
 */
export const useWriteSlotsBet = /*#__PURE__*/ createUseWriteContract({
  abi: slotsAbi,
  address: slotsAddress,
  functionName: 'bet',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link slotsAbi}__
 *
 *
 */
export const useSimulateSlots = /*#__PURE__*/ createUseSimulateContract({
  abi: slotsAbi,
  address: slotsAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link slotsAbi}__ and `functionName` set to `"bet"`
 *
 *
 */
export const useSimulateSlotsBet = /*#__PURE__*/ createUseSimulateContract({
  abi: slotsAbi,
  address: slotsAddress,
  functionName: 'bet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link slotsAbi}__
 *
 *
 */
export const useWatchSlotsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: slotsAbi,
  address: slotsAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link slotsAbi}__ and `eventName` set to `"GameFinished"`
 *
 *
 */
export const useWatchSlotsGameFinishedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: slotsAbi,
    address: slotsAddress,
    eventName: 'GameFinished',
  })
