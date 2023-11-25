/**
 *
 *
 *
 */

export let contractAddress = '0xaa3D09eDf8F3A3A1EB64F0EBe07487FfE423746F';
export let adminAddress = '0x3e153A81611E3Ac7C64991Cdb65652D1e9d11df6';
export let myChainId = 56;
export let contractABI = [
  {
    inputs: [
      { internalType: 'address', name: '_adminAddr', type: 'address' },
      { internalType: 'address', name: '_projectAddr', type: 'address' },
      { internalType: 'address', name: '_maintenanceAddr', type: 'address' },
      { internalType: 'address', name: '_developerAddr', type: 'address' },
      { internalType: 'address', name: '_refAdd', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'DURATION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'requestId', type: 'uint256' }],
    name: 'RejectCapitalWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adminAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adminFeeRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'requestId', type: 'uint256' }],
    name: 'approveCapitalWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'blockUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'capitalFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'capitalWithdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'capitalWithdrawalRequests',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
    name: 'convertTimestampToDate',
    outputs: [
      { internalType: 'uint256', name: 'day', type: 'uint256' },
      { internalType: 'uint256', name: 'month', type: 'uint256' },
      { internalType: 'uint256', name: 'year', type: 'uint256' },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defaultReferralAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositAdmin',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'developerAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'developerFeeRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDateComponents',
    outputs: [
      { internalType: 'uint256', name: 'day', type: 'uint256' },
      { internalType: 'uint256', name: 'month', type: 'uint256' },
      { internalType: 'uint256', name: 'year', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMonthlyPrecentage',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
        ],
        internalType: 'struct StakeShariah.MonthlyPercentage',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPastMonths',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
        ],
        internalType: 'struct StakeShariah.MonthlyPercentage[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getReferralStatus',
    outputs: [
      {
        components: [
          { internalType: 'uint8', name: 'level', type: 'uint8' },
          {
            internalType: 'uint256',
            name: 'referralEarnings',
            type: 'uint256',
          },
        ],
        internalType: 'struct StakeShariah.Referral',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddress', type: 'address' }],
    name: 'getUserProfit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddress', type: 'address' }],
    name: 'getUserStatus',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'balance', type: 'uint256' },
          { internalType: 'uint256', name: 'totalDeposits', type: 'uint256' },
          { internalType: 'uint256', name: 'totalEarned', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'totalWithdrawals',
            type: 'uint256',
          },
          { internalType: 'address', name: 'referral', type: 'address' },
          { internalType: 'bool', name: 'blocked', type: 'bool' },
          {
            components: [
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
              { internalType: 'bool', name: 'active', type: 'bool' },
            ],
            internalType: 'struct StakeShariah.Deposit[]',
            name: 'deposits',
            type: 'tuple[]',
          },
          {
            components: [
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
            ],
            internalType: 'struct StakeShariah.Withdrawal[]',
            name: 'withdrawals',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct StakeShariah.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWithdrawalRequests',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'user', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        internalType: 'struct StakeShariah.CapitalWithdrawalRequest[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: '_referral', type: 'address' },
    ],
    name: 'invest',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maintenanceAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maintenanceFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'monthlyPercentages',
    outputs: [
      { internalType: 'uint256', name: 'percentage', type: 'uint256' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'monthlyPrecentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'projectAddr',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralLevel1Rate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralLevel2Rate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralLevel3Rate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'referrals',
    outputs: [
      { internalType: 'uint8', name: 'level', type: 'uint8' },
      { internalType: 'uint256', name: 'referralEarnings', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reinvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'Newpercentage', type: 'uint256' },
    ],
    name: 'setPrecentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'unblockUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'users',
    outputs: [
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'totalDeposits', type: 'uint256' },
      { internalType: 'uint256', name: 'totalEarned', type: 'uint256' },
      { internalType: 'uint256', name: 'totalWithdrawals', type: 'uint256' },
      { internalType: 'address', name: 'referral', type: 'address' },
      { internalType: 'bool', name: 'blocked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
