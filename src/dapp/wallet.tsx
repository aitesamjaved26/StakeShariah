import { contractABI, contractAddress, myChainId } from '../models/contract';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { useAccount } from 'wagmi';
import { getContract } from 'wagmi/actions';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { ContractFunctionExecutionError } from 'viem';
import React from 'react';
import Web3 from 'web3';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
interface WalletProps {
  account: string;
  status: UserStats;
}
export function copyToClipboard(value) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast.success('Copied');

      console.log('Copied to clipboard:', value);
      // Optionally show a success message or perform other actions
    })
    .catch((error) => {
      const textArea = document.createElement('textarea');

      // Set the text content to the text you want to copy
      textArea.value = value;

      // Append the text area to the document
      document.body.appendChild(textArea);

      // Select the text in the text area
      textArea.select();

      // Execute the copy command
      document.execCommand('copy');

      // Remove the text area element
      document.body.removeChild(textArea);
      toast.success('Copied');
    });
}

export interface UserStats {
  BASE_PERCENT: number;
  referral: string;
  totalEarned: string;
  profit: string;
  getUserTotalDeposits: string;
  getUserAvailable: string;
  getUserStats: any;
  getUserTotalWithdrawn: string;
  getUserReferralsStats: any;
  userdata: UserDx;
  deposits: [];
  withdrawals: TxBlock[];
  refferalStatus: any;
}
export interface TxBlock {
  amount: any;
  timestamp: any;
}
export interface UserDx {
  balance: any;
  totalDeposits: any;
  totalWithdrawals: any;
  referral: any;
  blocked: boolean;
  deposits: TxBlock[];
  withdrawals: TxBlock[];
}
async function withdrawToken(account, amount) {
  console.log(account);
  const sunAmount = amount * 1000000;
}

export async function approveAmount(
  amount,
  selectedAccount,
  referralAddr,
  onCancel
) {
  const amountInWei = Web3.utils.toWei(amount, 'ether');

  const referralAddress = referralAddr ?? selectedAccount;
  await toast.loading('please wait', {
    duration: 2000,
  });
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  try {
    const gas = await contract.estimateGas.stake({
      account: selectedAccount,
      value: amountInWei,
      //@ts-ignore
      args: [referralAddress],
    });
    console.log(gas);
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      value: amountInWei,
      //@ts-ignore
      functionName: 'stake',
      //@ts-ignore
      gas: gas,
      //@ts-ignore
      account: selectedAccount,
      //@ts-ignore
      args: [referralAddress],
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
    console.log(e);
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
export async function withdrawAmount(
  type: 'requestWithdrawal' | 'withdraw',
  amount,
  selectedAccount
) {
  const amountInWei = Web3.utils.toWei(amount, 'ether');

  await toast.loading('please wait', {
    duration: 2000,
  });
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  try {
    const gas = await contract.estimateGas.stake({
      account: selectedAccount,
      value: amountInWei,
      //@ts-ignore
      args: [referralAddr],
    });
    console.log(gas);
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      value: amountInWei,
      //@ts-ignore
      functionName: `${type}`,
      //@ts-ignore
      gas: gas,
      //@ts-ignore
      account: selectedAccount,
      //@ts-ignore
      args: [amount],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    if (type == 'withdraw') {
      toast.success(
        'Congratulations! 🎉 Your withdraw profit proccess has been completed successfully. 🏦💰',
        {
          duration: 5000,
        }
      );
    } else {
      toast.success('Your Capital Withdraw will proccess in 2-3 days', {
        duration: 5000,
      });
    }
    console.log(hash);
  } catch (e) {
    console.log(e);
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
export async function Reinvest(selectedAccount) {
  await toast.loading('please wait', {
    duration: 2000,
  });
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  try {
    const gas = await contract.estimateGas.compound({
      account: selectedAccount,
      //@ts-ignore
    });
    console.log(gas);
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      value: amountInWei,
      //@ts-ignore
      functionName: `compound`,
      //@ts-ignore
      gas: gas,
      //@ts-ignore
      account: selectedAccount,
      //@ts-ignore
      args: [],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    toast.success(
      'Congratulations! 🎉 Your reinvest proccess has been completed successfully. 🏦💰',
      {
        duration: 5000,
      }
    );

    console.log(hash);
  } catch (e) {
    console.log(e);
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

export async function deposit(account, refferal, amount, onCancel) {
  console.log(amount);
  if (amount == null || amount === '' || amount < 0.04 || amount == 0) {
    toast.error('minimum amount is 0.04 BNB');
  } else {
    await approveAmount(amount, account, refferal, onCancel);
  }
}
export function AccountUI({ status }: { status: UserStats }) {
  const { address } = useAccount();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogtype, setDialog] = useState('');
  const handleShowDialog = (str) => {
    setShowDialog(true);
    setDialog(str);
  };
  const buttonStyle =
    'font-semibold font-poppins bg-[#3396FF] mb-5 p-2 w-72 h-12 text-white text-xl rounded-xl';
  return (
    <div className='flex flex-col justify-center items-center'>
      {showDialog && (
        <Modal
          show={showDialog}
          position={'center'}
          size={'sm'}
          dismissible={true}
          onClose={() => setShowDialog(false)}
        >
          <Modal.Header>{dialogtype}</Modal.Header>
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want {`${dialogtype}`}?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='success'
                  //onClick={() => props.setOpenModal(undefined)}
                >
                  Yes, I'm sure
                </Button>
                <Button
                  color='gray'
                  onClick={() => setShowDialog(false)}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div
        id='account'
        className='flex flex-col mt-5 justify-start items-center'
      >
        <div className='flex flex-col p-10 rounded-2xl shadow-2xl bg-white'>
          <div className='mt-6 flex flex-col justify-center items-center'>
            <button
              className={buttonStyle}
              onClick={() => handleShowDialog('Withdraw')}
              // onClick={() => withdrawToken(account)}
            >
              Withdraw
            </button>
            <button
              className={buttonStyle}
              //className={styles.stakeButton3}
              onClick={() => handleShowDialog('Re-invest')}
              // onClick={() => withdrawToken(account)}
            >
              Re-invest
            </button>
            <button
              className={buttonStyle}
              //className={styles.stakeButton2}
              onClick={() => handleShowDialog('capital Withdraw')}
              // onClick={() => withdrawToken(account)}
            >
              Unstake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function InvestUI({ onCancel }) {
  const [inputValue, setInputValue] = useState('');
  const { address } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [refAddrr, setRefAddrr] = useState(null);
  useEffect(() => {
    const queryString = window.location.search;
    // Parse the query string into a JavaScript object
    const params = new URLSearchParams(queryString);

    // Get the value of the "ref" parameter
    const refParam = params.get('ref');
    console.log('ref', refParam);
    if (refParam != null) {
      console.log('ref', refParam);
      setRefAddrr(refParam);
    }
  }, []);
  function shortenEthAddress(ethAddress) {
    if (ethAddress.length === 42) {
      const shortened = `0x${ethAddress.slice(2, 6)}...${ethAddress.slice(-4)}`;
      return shortened;
    }
    return ethAddress; // Return the original address if it's not in the expected format.
  }
  function getRefAddress() {
    if (refAddrr != null && refAddrr != address) {
      return refAddrr;
    } else {
      return '0x4b6687d5331f445345176fFa4ca7519b401152B1';
    }
  }
  const notes = [
    'Always Have Some Extra BNB  like  0.0005 BNB or more in your Wallet for transaction fee .',
    'Minimum Staking Amount 0.04 BNB',
  ];
  return (
    <div className='flex flec-col justify-center items-center'>
      {openModal && (
        <React.Fragment>
          <Modal
            position='center'
            size='lg'
            show={true}
            dismissible={true}
            //show={showPr}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header>Notes</Modal.Header>
            <Modal.Body>
              <ul style={{ margin: 10 }}>
                {notes.map((item) => (
                  <li
                    key={item}
                    className='text-black mb-5'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      )}
      <div className=''>
        <div
          id='stake'
          className='flex flex-col justify-center items-center'
        >
          <div className='flex flex-col justify-center items-center p-1'>
            <form id='amountForm'>
              <label>
                <TextInput
                  className='h-12 w-72 md:w-96 border-none mt-5 rounded-lg'
                  id='amount'
                  type='text'
                  name='amount'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Amount in BNB'
                />
              </label>
              {refAddrr != null && <label>Your refferal address</label>}
              {refAddrr != null && (
                <div>{`\n ${shortenEthAddress(getRefAddress())}`}</div>
              )}
            </form>
            <div style={{ margin: 0 }}>
              <div className='flex flex-col mt-5 justify-center items-center text-center'>
                <button
                  id='stakebutton'
                  onClick={() =>
                    deposit(address, getRefAddress(), inputValue, onCancel)
                  }
                  className='text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                >
                  {' '}
                  Stake Now
                </button>
                <div className='mb-2'></div>
                <button
                  id='learnmore'
                  onClick={() => setOpenModal(true)}
                  className='text-blue-600 font-poppins mt-12'
                >
                  {' '}
                  Learn More
                </button>
              </div>
              {/* <ul style={{ margin: 20 }}>
            {notes.map((item) => (
              <li
                key={item}
                className='text-black'
              >
                {item}
              </li>
            ))}
          </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
