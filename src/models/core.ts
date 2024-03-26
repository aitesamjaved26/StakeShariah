import { BigNumber, ethers } from 'ethers';
import { contractABI, contractAddress } from './contract';
import { readContracts } from 'wagmi';
import { UserStats } from '@/dapp/wallet';

export async function readValues(account) {
  var selectedAccount = account;
  // Convert Tron address to hexadecimal format
  const myContract: any = {
    address: contractAddress,
    abi: contractABI,
  };
  const data = await readContracts({
    contracts: [
      {
        ...myContract,
        functionName: 'getUserStatus',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functiocnName: 'getUserdividends',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getReferralStats',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getUserAvailable',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getUser',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getBASEPERCENT',
        args: [],
      },
      {
        ...myContract,
        functionName: 'getUserReferralWithdrawn',
        args: [selectedAccount],
      },
      //getReferralStats
      {
        ...myContract,
        functionName: 'getReferralStats',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'referralRewards',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getUserReferralWithdrawn',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'referrers',
        args: [selectedAccount],
      },
    ],
  });
  //var totalrefs = data[2].result[2] as any;
  const user: UserStats = {
    BASE_PERCENT: Number(ethers.utils.formatEther(data[5].result as any)),
    totalEarned: Number(
      ethers.utils.formatEther(data[4].result['totalEarned'] as any)
    ).toFixed(4),
    // getUserStats: '',
    // getUserReferralsStats: '',
    profit: Number(ethers.utils.formatEther(data[0].result[0] as any)).toFixed(
      6
    ),
    referral: `${data[10].result}`,
    getUserTotalDeposits: Number(
      ethers.utils.formatEther(BigNumber.from(data[0].result[1]) as any)
    ).toFixed(4),
    getUserAvailable: Number(
      ethers.utils.formatUnits(data[0].result[1] as any, 'wei')
    ).toFixed(4),
    refferalStatus: {
      getUserReferralWithdrawn: Number(
        ethers.utils.formatEther(data[9].result as any)
      ).toFixed(4),
      total: Number(
        ethers.utils.formatEther(
          BigNumber.from(data[4].result['totalReferralRewards']) as any
        )
      ).toFixed(4),
      totalFriends: `${data[7].result}`,
      referralEarnings: Number(
        ethers.utils.formatEther(data[8].result as any)
      ).toFixed(4),
    },
    getUserTotalWithdrawn: Number(
      ethers.utils.formatEther(data[0].result[2] as any)
    ).toFixed(4),
    // userdata: null,
    deposits: data[4].result['deposits'],
    // withdrawals: [],
  };
  return user;
}
export default readValues;
