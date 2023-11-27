import { contractABI, contractAddress, myChainId } from "../models/contract";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiArrowRepeatOutline } from "react-icons/ti";
import { useAccount } from "wagmi";
import { getContract } from "wagmi/actions";
import {
  prepareWriteContract,
  writeContract,
  readContract,
} from "wagmi/actions";
import { ContractFunctionExecutionError } from "viem";
import { AiOutlineArrowUp } from "react-icons/ai";

function WithdrawDialog({ onCancel }) {
  const { address } = useAccount();
  async function withdraw() {
    console.log(address);
    await toast.loading("please wait", {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });

    try {
      const gas = await contract.estimateGas.withdraw({
        account: address,
      });
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        functionName: "withdraw",
        //@ts-ignore
        //gas: gas,
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [],
      });
      const { hash } = await writeContract(request);
      toast.success("Done! Your request has been sent.", {
        duration: 5000,
      });
      onCancel();
    } catch (e) {
      if (e instanceof ContractFunctionExecutionError) {
        if (e.shortMessage.includes(`Insufficient balance`)) {
          console.log(e);
          toast.error(`Insufficient balance`);
        }
      } else {
        toast.error(`${e}`);
      }
    }
  }
  return (
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want withdraw?
      </h3>
      <div className="flex justify-center gap-4">
        <Button
          color="success"
          //onClick={() => props.setOpenModal(undefined)}
          onClick={() => withdraw()}
        >
          Yes, I'm sure
        </Button>
        <Button color="gray" onClick={onCancel}>
          No, cancel
        </Button>
      </div>
    </div>
  );
}
export function CapitalWithdrawD({ onCancel }) {
  const { address } = useAccount();
  async function capitalF() {
    console.log(address);
    await toast.loading("please wait", {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const gas = await contract.estimateGas.capitalWithdraw({
        account: address,
      });
      console.log(gas);
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        functionName: "capitalWithdraw",
        //@ts-ignore
        gas: gas,
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [],
      });
      console.log(request);
      const { hash } = await writeContract(request);
      toast.success("Done! Your request has been sent.", {
        duration: 5000,
      });
      onCancel();
    } catch (e) {
      if (e instanceof ContractFunctionExecutionError) {
        if (e.shortMessage.includes(`Insufficient balance`)) {
          toast.error(`Insufficient balance`);
        }
      } else {
        toast.error(`${e}`);
      }
    }
  }
  return (
    <div>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          You are requesting to withdraw capital from your wallet.
        </h3>
        <div className="flex justify-center gap-4">
          <Button
            color="red"
            onClick={() => {
              capitalF();
            }}
          >
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={onCancel}>
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReinvestD({ onCancel }) {
  const { address } = useAccount();
  async function reinvest() {
    console.log(address);
    await toast.loading("please wait", {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });

    try {
      const gas = await contract.estimateGas.reinvest({
        account: address,
      });
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        functionName: "reinvest",
        //@ts-ignore
        //gas: gas,
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [],
      });
      const { hash } = await writeContract(request);
      toast.success("Done! Your request has been sent.", {
        duration: 5000,
      });
      onCancel();
    } catch (e) {
      if (e instanceof ContractFunctionExecutionError) {
        if (e.shortMessage.includes(`Insufficient balance`)) {
          console.log(e);
          toast.error(`Insufficient balance`);
        }
      } else {
        toast.error(`${e}`);
      }
    }
  }
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex flex-col justify-center items-center">
        <TiArrowRepeatOutline color="#25D366" size={60}></TiArrowRepeatOutline>
        <div className="text-black mb-5 text-xl">
          Re-invest your profit with zero fees
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        <button
          id="stakebutton"
          onClick={() => reinvest()}
          className="text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        >
          {" "}
          Re-invest
        </button>
      </div>
    </div>
  );
}

export function UplinePartner({ onCancel }) {
  const [upline, setUpline] = React.useState("");
  const { address } = useAccount();
  async function getUpline() {
    console.log(address);
    await toast.loading("please wait", {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });

    try {
      const data = await readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getUplinePartner",
        args: [address],
      });
      if (!!data) setUpline(data as string);
      console.log("data", data);
    } catch (e) {
      if (e instanceof ContractFunctionExecutionError) {
        if (e.shortMessage.includes(`Insufficient balance`)) {
          console.log(e);
          toast.error(`Insufficient balance`);
        }
      } else {
        toast.error(`${e}`);
      }
    }
  }

  useEffect(() => {
    getUpline();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex flex-col justify-center items-center">
        <AiOutlineArrowUp color="#25D366" size={60}></AiOutlineArrowUp>
        <div className="text-black mb-8 text-xl">Your upline account is</div>
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        {upline == "" && (
          <div className="text-black mb-5 text-xl">Loading...</div>
        )}
        {upline == "0x0000000000000000000000000000000000000000" ? (
          <div className="text-black mb-5 text-lg">No upline account found</div>
        ) : (
          <div className="text-black mb-5 text-lg">
            <a href={`https://bscscan.com/address/${upline}`}>
              {upline.slice(0, 6) + "..." + upline.slice(-4)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
export default WithdrawDialog;
