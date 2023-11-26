import { ethers } from "ethers";
import { contractABI, contractAddress } from "./contract";
import { readContracts } from "wagmi";

interface UserStats {
  BASE_PERCENT: number;
  totalEarned: string;
  getUserStats: string;
  getUserReferralsStats: string;
  referral: string;
  profit: string;
  getUserTotalDeposits: string;
  getUserAvailable: string;
  getUserTotalWithdrawn: string;
  userdata: any;
  deposits: any[];
  withdrawals: any[];
}

interface MyContract {
  address: `0x${string}`;
  abi: any; // Consider specifying a more precise type for the ABI
}

export async function readValues(
  selectedAccount: string
): Promise<UserStats | null> {
  const myContract: MyContract = {
    address: contractAddress,
    abi: contractABI,
  };

  try {
    const data = await readContracts({
      contracts: [
        {
          ...myContract,
          functionName: "getUserStatus",
          args: [selectedAccount],
        },
        {
          ...myContract,
          functionName: "getUserdividends",
          args: [selectedAccount],
        },
      ],
    });
    console.log("data", data);
    if (!data || data.some((contractResult) => contractResult == null)) {
      console.error("Data is missing or incomplete");
      return null;
    }
    
    const formatValue = (
      value: any,
      units: "ether" | "wei" = "ether"
    ): string => {
      if (value === undefined) {
        return "0";
      }
      const formattedValue =
        units === "wei"
          ? ethers.utils.formatUnits(value, units)
          : ethers.utils.formatEther(value);
      return parseFloat(formattedValue).toFixed(6);
    };


    const user: UserStats = {
      BASE_PERCENT: 2,
      totalEarned: "0",
      getUserStats: "",
      getUserReferralsStats: "",
      referral: data[0].result["referral"],
      profit: formatValue(data[1].result),
      getUserTotalDeposits: formatValue(data[0].result["totalDeposits"]),
      getUserAvailable: formatValue(data[0].result["balance"], "wei"),
      getUserTotalWithdrawn: formatValue(data[0].result["totalWithdrawals"]),
      userdata: null,
      deposits: data[0].result["deposits"]?.reverse() || [],
      withdrawals: [],
    };

    console.log("user");
    console.log("user", user);

    return user;
  } catch (error) {
    console.error("Error reading values:", error);
    return null;
  }
}

export default readValues;
