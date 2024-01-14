import { BigNumber, ethers } from 'ethers';
import { contractABI, contractAddress } from './contract';
import { readContracts } from 'wagmi';
import { UserStats } from '@/dapp/wallet';

export async function readValues(selectedAccount) {
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
        functionName: 'getUserReferralsStats',
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
    ],
  });
  var totalrefs = data[2].result[2] as any;
  const user: UserStats = {
    BASE_PERCENT: 2.5,
    totalEarned: Number(
      ethers.utils.formatEther(data[4].result['totalEarned'] as any)
    ).toFixed(4),
    getUserStats: '',
    getUserReferralsStats: '',
    referral: `${data[2].result[0]}`,
    profit: Number(ethers.utils.formatEther(data[0].result[0] as any)).toFixed(
      6
    ),
    getUserTotalDeposits: Number(
      ethers.utils.formatEther(BigNumber.from(data[0].result[1]) as any)
    ).toFixed(4),
    getUserAvailable: Number(
      ethers.utils.formatUnits(data[0].result[1] as any, 'wei')
    ).toFixed(4),
    refferalStatus: {
      level: `${data[2].result[2]}`,
      total: Number(
        ethers.utils.formatEther(BigNumber.from(data[2].result[3]) as any)
      ).toFixed(4),
      totalFriends: totalrefs,
      referralEarnings: Number(
        ethers.utils.formatEther(data[2].result[1] as any)
      ).toFixed(4),
    },
    getUserTotalWithdrawn: Number(
      ethers.utils.formatEther(data[0].result[2] as any)
    ).toFixed(4),
    userdata: null,
    deposits: data[4].result['deposits'],
    withdrawals: [],
  };
  return user;
}
export default readValues;
