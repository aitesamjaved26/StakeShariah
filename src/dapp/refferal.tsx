import { useAccount } from 'wagmi';
import { UserStats, copyToClipboard } from './wallet';
import React from 'react';

import toast from 'react-hot-toast';
import { prepareWriteContract, writeContract, getContract } from '@wagmi/core';
import { contractAddress, contractABI, myChainId } from '../models/contract';

function RefferalUI({ status }: { status: UserStats }) {
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
        functionName: 'withdrawReferralRewards',
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
  const { address } = useAccount();
  function getUserLevel(refs: number[]): number {
    for (let i = 0; i < refs.length; i++) {
      if (refs[i] > 0) {
        // The first non-zero value in the array indicates the user's level
        return i + 1; // Add 1 to convert from zero-based index to level number
      }
    }

    // If all values are zero, the user is at level 0
    return 0;
  }
  return (
    <section
      id='share&earn'
      className={'overflow-hidden'}
    >
      <div className={``}>
        {
          <div className=''>
            <div className='flex flex-col gap-10 p-2 justify-center items-center'>
              <div className='flex flex-col h-auto w-fit gap-5 bg-white rounded-2xl'>
                <div>
                  <div>
                    Earn crypto rewards by referring friends! Share your unique
                    link, You get rewarded. Start now!
                  </div>
                  <div className='mt-5'>
                    <div className='text-xl font-semibold'>
                      Available Referral Rewards :
                    </div>
                    <div className='text-2xl font-bold font-poppins'>
                      {`${status.refferalStatus['referralEarnings']}`} BNB
                    </div>
                  </div>
                  <div className='mt-5'>
                    <div
                      onClick={() => callWithdraw()}
                      className='bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded w-24 p-2 flex flex-col justify-center items-center text-center'
                    >
                      Withdraw
                    </div>
                  </div>
                  {/* <div className='mt-5'>
                    <div className='text-xl font-semibold'>
                      Total Referral rewards:
                    </div>
                    <div className='text-2xl font-bold font-poppins'>
                      {`${status.refferalStatus['total']}`} BNB
                    </div>
                  </div> */}
                  <div className='mt-5'>
                    <div className='text-xl font-semibold'>
                      Total Referral Withdrawn:
                    </div>
                    <div className='text-2xl font-bold font-poppins'>
                      {`${status.refferalStatus['getUserReferralWithdrawn']}`}{' '}
                      BNB
                    </div>
                  </div>

                  <div className='mt-5'>
                    <div className='text-xl'>Refferal Levels : </div>
                    <div className='text-2xl font-medium font-poppins'>
                      Level 1 : {`${status.refferalStatus['totalFriends'][0]}`}
                    </div>
                    <div className='text-2xl font-medium font-poppins'>
                      Level 2 : {`${status.refferalStatus['totalFriends'][1]}`}
                    </div>
                    <div className='text-2xl font-medium font-poppins'>
                      Level 3 : {`${status.refferalStatus['totalFriends'][2]}`}
                    </div>
                  </div>
                  <input
                    className='w-full text-slate-600 mt-5 h-14 p-2 border-none bg-gray-300 rounded-lg'
                    readOnly
                    value={`stakeshariah.com/?ref=${address}`}
                  ></input>
                </div>
                <div className='flex flex-col justify-center items-center mt-10 mb-5'>
                  <button
                    //className={styles.stakeButton2}
                    // onClick={() => withdrawToken(account)}
                    className='text-white text-xl font-poppins i h-10 w-64 mb-5 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out'
                    onClick={() =>
                      copyToClipboard(`stakeshariah.com/?ref=${address}`)
                    }
                  >
                    Copy Link
                  </button>
                </div>
                <div className='h-42'></div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
    // <div className=''>
    //   <div>
    //     <img
    //       src={card}
    //       className='w-96 h-fit'
    //     ></img>
    //   </div>
    //   <div className='flex flex-col gap-10 p-5 justify-start items-start'>
    //     <div className='h-fit w-fit p-4 mr-10 ml-10 mb-40 shadow-2xl bg-white rounded-2xl'>
    //       <div className='text-2xl font-bold font-poppins'>Share & Earn</div>
    //       <div>
    //         Earn crypto rewards by referring friends! Share your unique link,
    //         they invest, you both get rewarded. Start now!
    //       </div>
    //       <div className='mt-5'>
    //         <div className='text-xl font-semibold'>Your Referral rewards:</div>
    //         <div className='text-2xl font-bold font-poppins'>
    //           {`${status.getUserReferralsStats}`} BNB
    //         </div>
    //       </div>
    //       <input
    //         className='w-full mt-5 h-14 p-2 border-none bg-gray-300 rounded-lg'
    //         readOnly
    //         value={`stakeshariah.com/?ref=${address}`}
    //       ></input>
    //       <div className='flex flex-col justify-center items-center mt-5'>
    //         <button
    //           //className={styles.stakeButton2}
    //           className='bg-green-400 p-2 h-fit rounded-2xl w-72 text-lg text-white font-semibold font-poppins'
    //           // onClick={() => withdrawToken(account)}
    //           onClick={() =>
    //             copyToClipboard(`stakeshariah.com/?ref=${address}`)
    //           }
    //         >
    //           Copy Link
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default RefferalUI;
