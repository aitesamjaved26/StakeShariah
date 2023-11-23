import { ethers } from 'ethers';
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
      // {
      //   ...myContract,
      //   functionName: 'getUserProfit',
      //   args: [selectedAccount],
      // },
      {
        ...myContract,
        functionName: 'getUserStatus',
        args: [selectedAccount],
      },
      {
        ...myContract,
        functionName: 'getUserProfit',
        args: [selectedAccount],
      },
    ],
  });
  console.log(data[0].result);
  console.log(
    Number(
      ethers.utils.formatEther(data[0].result[`totalWithdrawals`] as any)
    ).toString(),
    'total'
  );

  const user: UserStats = {
    BASE_PERCENT: 2,
    totalEarned: '0',
    getUserStats: '',
    getUserReferralsStats: '',
    referral: data[0].result['referral'],
    profit: Number(ethers.utils.formatEther(data[1].result as any)).toFixed(6),

    getUserTotalDeposits: Number(
      ethers.utils.formatEther(data[0].result[`totalDeposits`] as any)
    ).toString(),
    getUserAvailable: ethers.utils.formatUnits(
      data[0].result['balance'] as any,
      'wei'
    ),
    // getUserStats: '0.0',
    // getUserReferralsStats: Number(
    //   ethers.utils.formatEther(data[5].result as any)
    // ),
    getUserTotalWithdrawn: Number(
      ethers.utils.formatEther(data[0].result[`totalWithdrawals`] as any)
    ).toFixed(5),
    userdata: null,
    deposits: data[0].result['deposits'].reverse(),
    withdrawals: [],
  };
  return user;
}
export default readValues;
