import { contractABI, contractAddress, myChainId } from '../models/contract';
import { Button } from 'flowbite-react';
import React from 'react';
import toast from 'react-hot-toast';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TiArrowRepeatOutline } from 'react-icons/ti';
import { useAccount } from 'wagmi';
import { getContract } from 'wagmi/actions';
import {
  prepareWriteContract,
  writeContract,
  readContracts,
} from '@wagmi/core';
import { ContractFunctionExecutionError } from 'viem';
import { BigNumber, ethers } from 'ethers';

export async function getBasePercent() {
  const myContract: any = {
    address: contractAddress,
    abi: contractABI,
  };
  var result = await readContracts({
    contracts: [
      {
        ...myContract,
        functionName: 'getBASEPERCENT',
        args: [],
      },
    ],
  });
  var rate = BigNumber.from(result[0].result);
  console.log('base', rate.toNumber());

  return rate.toNumber() / 10;
}

function WithdrawDialog({ onCancel }) {
  const { address } = useAccount();
  async function callWithdraw() {
    await toast.loading('please wait', {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const gas = await contract.estimateGas.claim({
        account: address,
        args: [],
      });
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        functionName: 'claim',
        //@ts-ignore
        gas: gas,
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [],
      });
      const { hash } = await writeContract(request);
      toast.success('Done! You will receive your funds within minutes!', {
        duration: 5000,
      });
      console.log('rx', gas);
    } catch (e) {
      toast.error(`${e}`);
    }
  }
  return (
    <div className='text-center'>
      <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
      <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
        Are you sure you want withdraw?
      </h3>
      <div className='flex justify-center gap-4'>
        <Button
          color='success'
          onClick={() => {
            callWithdraw().then((v) => onCancel());
          }}
        >
          Yes, I'm sure
        </Button>
        <Button
          color='gray'
          onClick={onCancel}
        >
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
    await toast.loading('please wait', {
      duration: 2000,
    });
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const gas = await contract.estimateGas.unstake({
        account: address,
        args: [],
      });
      console.log(gas);
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        functionName: 'unstake',
        //@ts-ignore
        gas: gas,
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [],
      });
      console.log(request);
      const { hash } = await writeContract(request);
      toast.success('Done! Your request has been sent.', {
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
      <div className='text-center'>
        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
        <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
          You are requesting to withdraw capital from your wallet.
        </h3>
        <div className='flex justify-center gap-4'>
          <Button
            color='red'
            onClick={() => {
              capitalF();
            }}
          >
            Yes, I'm sure
          </Button>
          <Button
            color='gray'
            onClick={onCancel}
          >
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

async function compound(account) {
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  try {
    const gas = await contract.estimateGas.compound({
      account: account,
      //@ts-ignore
      args: [],
    });
    console.log(gas);
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      functionName: 'compound',
      //@ts-ignore
      gas: gas,
      //@ts-ignore
      account: account,
      //@ts-ignore
      args: [],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    toast.success(
      'Congratulations! 🎉 Your deposit has been completed successfully. 🏦💰',
      {
        duration: 3000,
      }
    );
    console.log(hash);
  } catch (e) {
    console.log('reinvest error', e);
    if (e instanceof ContractFunctionExecutionError) {
      var message = `${e.shortMessage}`;
      //toast.error(`${e.shortMessage}`);
      if (message.includes('exceeds the balance of the account.')) {
        toast.error('You dont have enough for gas');
      } else if (message.includes('')) {
        toast.error(message);
      }
    } else {
      toast.error(e);
    }
  }
}

export function ReinvestD() {
  const { address } = useAccount();
  return (
    <div className='flex flex-col justify-center items-center gap-5 p-5'>
      <div className='flex flex-col justify-center items-center'>
        <TiArrowRepeatOutline
          color='#25D366'
          size={60}
        ></TiArrowRepeatOutline>
        <div className='text-black mb-5 text-xl'></div>
      </div>
      <div className='flex flex-col justify-center items-center mt-2'>
        <button
          id='stakebutton'
          onClick={() => {
            compound(address);
          }}
          className='text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
        >
          {' '}
          Re-invest
        </button>
      </div>
    </div>
  );
}
export default WithdrawDialog;
