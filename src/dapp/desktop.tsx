import { Web3Button } from '@web3modal/react';
import { Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  AiOutlineArrowDown,
  AiOutlineBell,
  AiOutlineDollar,
  AiOutlineMail,
  AiOutlinePlusCircle,
  AiOutlineQuestion,
} from 'react-icons/ai';
import { menu } from '../assets';

import { BsTelegram } from 'react-icons/bs';
import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaFileContract,
  FaMoneyBill,
  FaPercent,
  FaUser,
} from 'react-icons/fa';
import { HiArrowCircleUp, HiTable } from 'react-icons/hi';
import { TiArrowRepeatOutline } from 'react-icons/ti';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import readValues from '../models/core';
import WithdrawDialog, { CapitalWithdrawD, ReinvestD } from './actions';
import FAQSection from './faqs';
import RefferalUI from './refferal';
import TxPage from './tx';
import { InvestUI, UserStats } from './wallet';
import AdminPanel from './admin';
import { navLinks } from '../constants/index';
import { adminAddress, contractAddress } from '../models/contract';
import React from 'react';
import axios from 'axios';
/***
 *
 *
 *
 */

interface NavProbs {
  icon: any;
}
function DesktopUI() {
  const [Affiliate, setAffiliate] = useState(true);
  const [status, setStatus] = useState<UserStats | null>(null);
  const [toggle, setToggle] = useState(false);
  const [refadd, setRefAdd] = useState(null);

  const [showMenu, setMenu] = useState(false);
  const [currentPage, SetPage] = useState('Dashboard');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [Banner, setBanner] = useState(false);

  const [isloading, SetLoading] = useState(true);
  const { isConnected, address } = useAccount();

  function getCurrentPage() {
    if (currentPage == 'Dashboard') {
      return <DashBoard status={status}></DashBoard>;
    } else if (currentPage == 'Share & earn') {
      return <RefferalUI status={status}></RefferalUI>;
    } else if (currentPage == 'Transactions') {
      return <TxPage status={status}></TxPage>;
    } else if (currentPage == 'FAQS') {
      return <FAQSection></FAQSection>;
    } else if (currentPage == 'Admin Panel') {
      return <AdminPanel></AdminPanel>;
    } else {
      return <div>Page Not found</div>;
    }
  }
  function toggleMenu() {
    setMenu(!showMenu);
    console.log('hi');
  }
  useEffect(() => {
    if (isConnected && chain?.id != 97) {
      setBanner(true);
    } else {
      //setBanner(false);
    }
    SetLoading(true);
    if (isConnected) {
      readValues(address).then((value) => {
        console.log(value);
        setTimeout(() => {
          SetLoading(false);

          setStatus(value);
        }, 500);
      });
    } else {
      //setStatus(null);
      SetLoading(false);
    }
  }, [address, chain, isConnected]);
  const mylistNav = [
    {
      href: '#',
      icon: <HiTable size={22}></HiTable>,
      txt: 'Dashboard',
    },
    // {
    //   href: '#',
    //   icon: <BsArrowLeftRight size={22}></BsArrowLeftRight>,
    //   txt: 'Transactions',
    // },
    {
      href: '#',
      icon: <AiOutlineDollar size={22}></AiOutlineDollar>,
      txt: 'Share & earn',
    },
    {
      href: `https://bscscan.com/address/${contractAddress}`,
      icon: <FaFileContract size={22}></FaFileContract>,
      txt: 'Contract',
    },
    {
      href: 'https://t.me/StakeShariah',
      icon: (
        <BsTelegram
          size={22}
          color={`#2AABEE`}
        ></BsTelegram>
      ),
      txt: 'Community',
    },
    {
      href: '#',
      icon: <AiOutlineQuestion size={22}></AiOutlineQuestion>,
      txt: 'FAQS',
    },
    {
      href: 'mailto:support@stakeshariah.com',
      icon: <AiOutlineMail size={22}></AiOutlineMail>,
      txt: 'Support',
    },
  ];
  const mylistNav2 = [
    {
      href: '#',
      icon: <HiTable size={22}></HiTable>,
      txt: 'Dashboard',
    },
    {
      href: '#',
      icon: <HiTable size={22}></HiTable>,
      txt: 'Admin Panel',
    },
    // {
    //   href: '#',
    //   icon: <BsArrowLeftRight size={22}></BsArrowLeftRight>,
    //   txt: 'Transactions',
    // },
    {
      href: '#',
      icon: <AiOutlineDollar size={22}></AiOutlineDollar>,
      txt: 'Share & earn',
    },
    {
      href: `https://bscscan.com/address/${contractAddress}`,
      icon: <FaFileContract size={22}></FaFileContract>,
      txt: 'Contract',
    },
    {
      href: 'https://t.me/StakeShariah',
      icon: (
        <BsTelegram
          size={22}
          color={`#2AABEE`}
        ></BsTelegram>
      ),
      txt: 'Community',
    },
    {
      href: '#',
      icon: <AiOutlineQuestion size={22}></AiOutlineQuestion>,
      txt: 'FAQS',
    },
    {
      href: 'mailto:support@stakeshariah.com',
      icon: <AiOutlineMail size={22}></AiOutlineMail>,
      txt: 'Support',
    },
  ];
  const mylistx = address == adminAddress ? mylistNav2 : mylistNav;
  function SideBarItem(txt, icon, href, isCurrent) {
    return (
      <li
        key={`nav_${txt}`}
        onClick={() => {
          if (href == '#') {
            SetPage(txt);
          } else {
            window.open(href);
          }
        }}
      >
        <a
          href='#'
          className={`flex items-center ${
            isCurrent == true ? `bg-gray-100` : ``
          }  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
        >
          <div
            className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
            aria-hidden='true'
          >
            {icon}
          </div>
          <span className='ml-3'>{txt}</span>
        </a>
      </li>
    );
  }
  return (
    <div
      id='desktop'
      className='font-Inter'
    >
      <Toaster position='top-center'></Toaster>

      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <div className='sm:hidden flex flex-1 justify-end items-center'>
                {/* <img
                  src={toggle ? close : menu}
                  alt='menu'
                  onClick={() => setToggle((prev) => !prev)}
                /> */}
                <button
                  onClick={() => setToggle((prev) => !prev)}
                  type='button'
                  className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                >
                  <span className='sr-only'>Open sidebar</span>
                  <svg
                    className='w-6 h-6'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      clip-rule='evenodd'
                      fill-rule='evenodd'
                      d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                    ></path>
                  </svg>
                </button>
                <div
                  className={`${
                    toggle ? 'flex' : 'hidden'
                  } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                  <ul className='list-none flex flex-col justify-end items-center flex-1'>
                    {mylistx.map((nav, index) => (
                      <li
                        key={nav.href}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${
                          index === navLinks.length - 1 ? 'mr-0' : 'mb-4'
                        } text-white`}
                      >
                        <a
                          onClick={() => {
                            if (nav.href == '#') {
                              SetPage(nav.txt);
                            } else {
                              window.open(nav.href);
                            }
                          }}
                        >
                          {nav.txt}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href='#'
                className='flex items-center ml-2 md:mr-24'
              >
                <img
                  src='logo.png'
                  className='h-8 mr-3'
                  alt='Stake Shirah Logo'
                />
                <div className='hidden md:visible'>
                  <span className='font-Unbounded text-xl font-bold self-center text-black'>
                    Stake
                  </span>
                  {` `}
                  <span className='font-Unbounded text-xl font-bold self-center text-[#]'>
                    Shirah
                  </span>
                </div>

                {/* <div className='font-Unbounded self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                  Stake {''}
                  <span className='text[#fff]'>Shirah</span>
                </div> */}
              </a>
            </div>
            <div className='flex items-center'>
              <div className='hidden md:visible bg-grey-300 cursor-pointer'>
                <AiOutlineBell size={25}></AiOutlineBell>
              </div>
              <div className='flex items-center ml-3'>
                <div>
                  <Web3Button></Web3Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id='logo-sidebar'
        className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        // aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            {mylistx.map((val) => {
              return SideBarItem(
                val.txt,
                val.icon,
                val.href,
                val.txt == currentPage
              );
            })}
          </ul>

          {Affiliate && (
            <div
              id='dropdown-cta'
              className='p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900'
              role='alert'
            >
              <div className='flex items-center mb-3'>
                <span className='bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900'>
                  Affiliate
                </span>
                <button
                  type='button'
                  className='ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800'
                  onClick={() => setAffiliate(false)}
                >
                  <span className='sr-only'>Close</span>
                  <svg
                    className='w-2.5 h-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                </button>
              </div>
              <p className='mb-3 text-sm text-blue-800 dark:text-blue-400'>
                Share Your link and earn instantly on every investment up to 8%
              </p>
              <div
                className='cursor-pointer text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300'
                onClick={() => SetPage('Share & earn')}
              >
                Share Now
              </div>
            </div>
          )}
        </div>
      </aside>

      <div className='p-4 sm:ml-64'>
        <div className='p-4 mt-20 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
          {!isloading && isConnected && getCurrentPage()}
          {isloading && (
            <div className='flex flex-col items-center'>
              <Spinner></Spinner>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesktopUI;

function DashBoard({ status }: { status: UserStats }) {
  const [tab, setTab] = useState('Invest');
  const [modalTitle, setTitle] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [myModal, setModal] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(0);
  const coinmarketcapApiKey = 'ab8ea359-3f69-43a3-8a97-b69174799ceb'; // Replace with your CoinMarketCap API key
  const apiUrl = `api.coincap.io/v2/assets/bitcoin`;

  const fetchBNBPrice = async () => {
    try {
      const response = await axios.get(
        'https://api.coincap.io/v2/assets/binance-coin'
      );

      if (response.data) {
        const price = response.data.data.priceUsd;
        setBnbPrice(price);
      }
    } catch (error) {
      console.error('Error fetching BNB price:', error);
    }
  };
  function shortenEthAddress(ethAddress) {
    if (ethAddress.length === 42) {
      const shortened = `0x${ethAddress.slice(2, 6)}...${ethAddress.slice(-4)}`;
      return shortened;
    }
    return ethAddress; // Return the original address if it's not in the expected format.
  }
  useEffect(() => {
    fetchBNBPrice();
  }, []);
  return (
    <div className=''>
      {showDialog && (
        <Modal
          show={showDialog}
          position={'center'}
          size={'md'}
          dismissible={true}
          onClose={() => setShowDialog(false)}
        >
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>{myModal}</Modal.Body>
        </Modal>
      )}
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-blue-300 p-2 rounded-full'>
              <FaDollarSign size={20}></FaDollarSign>
            </div>
            <div className='flex flex-col'>
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  Available withdraw
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>
                  {status.profit} BNB
                </div>
              </div>
              <div className='text-zinc-600'>
                ~ {(Number(status.profit) * bnbPrice).toFixed(2)} $
              </div>
            </div>
          </div>
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-green-300 p-2 rounded-full'>
              <FaArrowDown size={20}></FaArrowDown>
            </div>
            <div className='flex flex-col'>
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  Total deposits
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>
                  {`${status.getUserTotalDeposits}`} BNB
                </div>
              </div>
              <div className='text-zinc-600'>
                ~ {(Number(status.getUserTotalDeposits) * bnbPrice).toFixed(2)}{' '}
                $
              </div>
            </div>
          </div>
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-red-300 p-2 rounded-full'>
              <FaArrowUp size={20}></FaArrowUp>
            </div>
            <div className='flex flex-col'>
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  Total withdrawals
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>
                  {status.getUserTotalWithdrawn} BNB
                </div>
              </div>
              <div className='text-zinc-600'>
                ~ {(Number(status.getUserTotalWithdrawn) * bnbPrice).toFixed(2)}{' '}
                $
              </div>
            </div>
          </div>
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-lime-500 p-2 rounded-full'>
              <FaMoneyBill
                color='white'
                size={20}
              ></FaMoneyBill>
            </div>
            <div className='flex flex-col'>
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  Total Earned
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>
                  {status.totalEarned} BNB
                </div>
              </div>
              <div className='text-zinc-600'>
                ~ {(Number(status.getUserTotalWithdrawn) * bnbPrice).toFixed(2)}{' '}
                $
              </div>
            </div>
          </div>

          {status.referral != '0x0000000000000000000000000000000000000000' && (
            <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
              <div className='bg-red-300 p-2 rounded-full'>
                <FaUser size={20}></FaUser>
              </div>
              <div className='flex flex-col'>
                <div>
                  <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                    Your Upline Partner
                  </p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <div className='text-xl md:text-3xl font-bold'>
                    {shortenEthAddress(status.referral)}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-red-300 p-2 rounded-full'>
              <FaPercent size={20}></FaPercent>
            </div>
            <div className='flex flex-col'>
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  Weekly Precentage
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>2.5% ROI</div>
              </div>
            </div>
          </div>
          <div className='flex flex-row p-2 gap-2 items-center justify-start h-28 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='bg-black-300 p-2 rounded-full'>
              <img
                className='w-10 h-10'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg/2048px-BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg.png'
              ></img>
            </div>
            <div
              onClick={() => {
                window.open('https://coinmarketcap.com/currencies/bnb');
              }}
              className='flex flex-col cursor-pointer'
            >
              <div>
                <p className='text-sm md:tex-xl font-semibold font-poppins text-gray-500'>
                  BNB PRICE
                </p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='text-xl md:text-3xl font-bold'>
                  {Number(bnbPrice).toFixed(2)} $
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div className='flex flex-row p-2 gap-2 items-center justify-center min-h-72 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center p-5'>
              {Object.entries([
                {
                  title: 'Deposit',
                  icon: (
                    <AiOutlinePlusCircle
                      size={35}
                      color='#623CE7'
                    ></AiOutlinePlusCircle>
                  ),
                  widget: (
                    <InvestUI onCancel={() => setShowDialog(false)}></InvestUI>
                  ),
                },
                {
                  title: 'Withdraw',
                  icon: <AiOutlineArrowDown size={35}></AiOutlineArrowDown>,
                  widget: (
                    <WithdrawDialog
                      onCancel={() => setShowDialog(false)}
                    ></WithdrawDialog>
                  ),
                },
                {
                  title: 'Capital',
                  icon: (
                    <AiOutlineDollar
                      color='#623CE7'
                      size={35}
                    ></AiOutlineDollar>
                  ),
                  widget: (
                    <CapitalWithdrawD
                      onCancel={() => setShowDialog(false)}
                    ></CapitalWithdrawD>
                  ),
                },
                // {
                //   title: 'Reinvest',
                //   icon: (
                //     <TiArrowRepeatOutline
                //       color='#25D366'
                //       size={35}
                //     ></TiArrowRepeatOutline>
                //   ),
                //   widget: <ReinvestD></ReinvestD>,
                // },
              ]).map((val) => {
                return (
                  <div
                    onClick={() => {
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
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div className='flex flex-row p-2 gap-2 items-start justify-start min-h-72 rounded bg-gray-50 dark:bg-gray-800'>
            <TxPage status={status}></TxPage>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mb-4'></div>
      </div>
    </div>
  );
}
