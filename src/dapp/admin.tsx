import { Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  AiFillAccountBook,
  AiOutlinePercentage,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { FaBan } from 'react-icons/fa';
import { GoBlocked } from 'react-icons/go';
import BlackList from './admin/blacklist';
import CapitalRequests from './admin/requests';
import toast from 'react-hot-toast';
import { getContract } from 'wagmi/actions';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { contractAddress, contractABI, myChainId } from '../models/contract';
import Web3 from 'web3';
import { useAccount } from 'wagmi';
import { ContractFunctionExecutionError } from 'viem';
import { approveAmount } from './wallet';
import ContractPr from './admin/precentage';

function AdminPanel() {
  const [tab, setTab] = useState('Invest');
  const [size, setSize] = useState('md');
  const [modalTitle, setTitle] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [myModal, setModal] = useState(null);
  return (
    <div>
      {showDialog && (
        <Modal
          show={showDialog}
          position={'center'}
          size={size}
          dismissible={true}
          onClose={() => setShowDialog(false)}
        >
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>{myModal}</Modal.Body>
        </Modal>
      )}
      <div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div className='flex flex-row p-2 gap-2 items-center justify-center min-h-72 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center p-5'>
              {Object.entries([
                {
                  title: 'Leader Invest',
                  icon: (
                    <AiOutlineUser
                      size={35}
                      color='#623CE7'
                    ></AiOutlineUser>
                  ),
                  widget: (
                    <LeaderInvestUI
                      onCancel={() => setShowDialog(false)}
                    ></LeaderInvestUI>
                  ),
                },
                {
                  title: 'Deposit No fees',
                  icon: (
                    <AiOutlinePlusCircle
                      size={35}
                      color='#623CE7'
                    ></AiOutlinePlusCircle>
                  ),
                  widget: (
                    <DepositAdminUI
                      onCancel={() => setShowDialog(false)}
                    ></DepositAdminUI>
                  ),
                },
                {
                  title: 'Set Precentage',
                  size: '2xl',
                  icon: (
                    <AiOutlinePercentage
                      color='red'
                      size={35}
                    ></AiOutlinePercentage>
                  ),
                  widget: (
                    <ContractPr
                    ></ContractPr>
                  ),
                },
                {
                  title: 'Block User',
                  icon: (
                    <FaBan
                      color='#623CE7'
                      size={35}
                    ></FaBan>
                  ),
                  widget: (
                    <BlackList
                      typex='block'
                      onCancel={() => setShowDialog(false)}
                    ></BlackList>
                  ),
                },
                {
                  title: 'UnBlock',
                  icon: (
                    <GoBlocked
                      color='#25D366'
                      size={35}
                    ></GoBlocked>
                  ),
                  widget: (
                    <BlackList
                      typex='unblock'
                      onCancel={() => setShowDialog(false)}
                    ></BlackList>
                  ),
                },
                {
                  title: 'Capital Requests',
                  size: '4xl',
                  icon: (
                    <AiFillAccountBook
                      color='#0284c7'
                      size={35}
                    ></AiFillAccountBook>
                  ),
                  widget: <CapitalRequests></CapitalRequests>,
                },
              ]).map((val) => {
                return (
                  <div
                    onClick={() => {
                      if (val[1].size != null) {
                        setSize(val[1].size);
                      } else {
                        setSize('md');
                      }
                      setTitle(val[1].title);
                      setShowDialog(true);
                      setModal(val[1].widget);
                    }}
                    className='flex flex-col w-72 md:w-56 cursor-pointer shadow-md font-poppins text-[#1b1b1b] font-semibold text-xl p-4 hover:bg-gray-300 bg-white items-center'
                    key={`${val[0]}`}
                  >
                    {val[1].icon}
                    {val[1].title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

function DepositAdminUI({ onCancel }) {
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
      return '0x31D6Ce421641208C843335cfdB73ACac0Efd374d';
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
            </form>
            <div style={{ margin: 0 }}>
              <div className='flex flex-col mt-5 justify-center items-center text-center'>
                <button
                  id='stakebutton'
                  onClick={() => depositforAdmin(address, inputValue, onCancel)}
                  className='text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                >
                  {' '}
                  Stake Now
                </button>
                <div className='mb-2'></div>
                <button
                  id='learnmore'
                  className='text-blue-600 font-poppins mt-12'
                ></button>
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

async function deposit(account, refferal, amount, onCancel) {
  console.log(amount);
  if (amount == null || amount === '' || amount < 0.04 || amount == 0) {
    toast.error('Amonut must be more than zero');
  } else {
    await approveAmount(amount, account, refferal, onCancel);
  }
}
async function depositforAdmin(account, amount, onCancel) {
  console.log(amount);
  if (amount == null || amount === '' || amount == 0) {
    toast.error('Amonut must be more than zero');
  } else {
    await depostAdmin(amount, account, onCancel);
  }
}
function LeaderInvestUI({ onCancel }) {
  const [inputValue, setInputValue] = useState('');
  const { address } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [refAddrr, setRefAddrr] = useState(null);
  const [toAddrr, setToAddrr] = useState(null);

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
            <Modal.Body></Modal.Body>
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
              <label>
                <TextInput
                  className='h-12 w-72 md:w-96 border-none mt-5 rounded-lg'
                  id='address'
                  type='text'
                  name='address'
                  value={toAddrr}
                  onChange={(e) => setToAddrr(e.target.value)}
                  placeholder='User Address'
                />
              </label>
              <label>
                <TextInput
                  className='h-12 w-72 md:w-96 border-none mt-5 rounded-lg'
                  id='refferal'
                  type='text'
                  name='refferal'
                  value={refAddrr}
                  onChange={(e) => setRefAddrr(e.target.value)}
                  placeholder='Refferal'
                />
              </label>
            </form>
            <div style={{ margin: 0 }}>
              <div className='flex flex-col mt-5 justify-center items-center text-center'>
                <button
                  id='stakebutton'
                  onClick={() => {
                    console.log('rx', `${inputValue} ${toAddrr}`);
                    if (
                      inputValue != null &&
                      address != null &&
                      refAddrr != null &&
                      toAddrr
                    ) {
                      leaderInvest(
                        inputValue,
                        address,
                        refAddrr,
                        toAddrr,
                        onCancel
                      );
                    }
                  }}
                  className='text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-red-400 to-red-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                >
                  {' '}
                  Stake Now
                </button>
                <div className='mb-2'></div>
                <button
                  id='learnmore'
                  className='text-blue-600 font-poppins mt-12'
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
async function leaderInvest(
  amount,
  selectedAccount,
  referralAddr,
  toAccount: any,
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
    const gas = await contract.estimateGas.leaderinvest({
      account: selectedAccount,
      //@ts-ignore
      args: [toAccount, amountInWei, referralAddress],
    });
    console.log(gas);
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      //@ts-ignore
      address: contractAddress,
      //@ts-ignore
      abi: contractABI,
      //@ts-ignore
      functionName: 'leaderinvest',
      //@ts-ignore
      gas: gas,
      //@ts-ignore
      account: selectedAccount,
      //@ts-ignore
      args: [toAccount, amountInWei, referralAddress],
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
export async function depostAdmin(amount, selectedAccount, onCancel) {
  const amountInWei = Web3.utils.toWei(amount, 'ether');

  await toast.loading('please wait', {
    duration: 2000,
  });
  const contract = getContract({
    address: contractAddress as any,
    abi: contractABI,
  });
  try {
    const gas = await contract.estimateGas.deposit({
      account: selectedAccount,
      value: amountInWei,
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
      value: amountInWei,
      //@ts-ignore
      functionName: 'deposit',
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
