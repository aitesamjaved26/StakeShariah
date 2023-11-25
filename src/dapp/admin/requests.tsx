import { Spinner } from 'flowbite-react';
import {
  contractAddress,
  contractABI,
  myChainId,
  adminAddress,
} from '../../models/contract';
import React, { useEffect, useState } from 'react';
import { readContracts } from 'wagmi';
import { ethers } from 'ethers';
import { prepareWriteContract, writeContract, getContract } from '@wagmi/core';

import { toast } from 'react-hot-toast';
import { ContractFunctionExecutionError } from 'viem';
async function getAllrequests() {
  const myContract: any = {
    address: contractAddress,
    abi: contractABI,
  };
  var result = await readContracts({
    contracts: [
      {
        ...myContract,
        functionName: 'getWithdrawalRequests',
        args: [],
      },
    ],
  });
  console.log(result[0]);
  console.log(result[0].result);
  return result[0].result;
}
async function ApproveRequest(requestId) {
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });

  try {
    const gas = await contract.estimateGas.approveCapitalWithdrawal({
      account: adminAddress,
      //@ts-ignore
      args: [requestId],
    });
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      //@ts-ignore
      functionName: 'approveCapitalWithdrawal',
      //@ts-ignore
      account: adminAddress,
      //@ts-ignore
      args: [requestId],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    toast.success('Approved!', {
      duration: 3000,
    });
  } catch (e) {
    if (e instanceof ContractFunctionExecutionError) {
      toast.error(`${e.shortMessage}`);
    } else {
      toast.error(`${e}`);
    }
  }
}
async function RejectRequest(requestId) {
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  const gas = await contract.estimateGas.RejectCapitalWithdrawal({
    account: adminAddress,
    //@ts-ignore
    args: [requestId],
  });
  try {
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      //@ts-ignore
      functionName: 'RejectCapitalWithdrawal',
      //@ts-ignore
      account: adminAddress,
      //@ts-ignore
      args: [requestId],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    toast.success('Done!', {
      duration: 3000,
    });
  } catch (e) {
    toast.error(`${e}`);
  }
}
function CapitalRequests() {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllrequests().then((val) => {
      setWithdrawalRequests(val);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading && (
        <div className='flex flex-col justify-center items-center'>
          <Spinner></Spinner>
        </div>
      )}
      <ul>
        {withdrawalRequests.map((request, index) => {
          //   <li key={index}>
          //     {request.user}, Amount: {request.amount}, Approved:{' '}
          //     {request.approved.toString()}
          //   </li>
          console.log(request.amount);
          return (
            <div className='flex flex-col'>
              <div
                key={index}
                className='flex flex-row justify-between'
              >
                <div className='flex flex-row gap-5'>
                  <div className='bg-slate-300 h-10 flex flex-col text-lg rounded-full p-4 justify-center items-center'>
                    {index + 1}
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div className='text-xl'>{request.user}</div>
                    <div className='mt-2 text-lg text-sky-600'>
                      {Number(
                        ethers.utils.formatEther(request.amount as any)
                      ).toFixed(5)}{' '}
                      BNB
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-end gap-4'>
                  <div
                    onClick={() => {
                      RejectRequest(request.id);
                    }}
                    className='mr-32 text-white text-xl font-poppins h-10 w-fit p-2 bg-gradient-to-br from-red-400 to-red-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                  >
                    Reject
                  </div>
                  <div
                    onClick={() => {
                      ApproveRequest(request.id);
                    }}
                    className='text-white text-xl font-poppins  h-10 w-fit p-2 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                  >
                    Approve
                  </div>
                </div>
              </div>
              <div className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'></div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default CapitalRequests;
