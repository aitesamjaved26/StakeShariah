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
        duration: 1000,
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
                      className='flex flex-col content-center justify-center items-center text-center font-poppins w-32 h-14 text-white text-xl cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform hover:scale-110 transition duration-300 ease-out'
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
                    <div className='text-xl'>Referral Levels : </div>
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
                  <div className='flex flex-col md:flex-row items-center justify-between mt-5'>
                    <input
                      className='flex-grow text-slate-600  h-14 p-2 border-none bg-gray-300 rounded-lg mr-2'
                      readOnly
                      value={`stakeshariah.com/?ref=${address}`}
                    />
                    <button
                      className='text-white mt-5 md:mt-0 text-xl font-poppins w-32 h-14 p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl cursor-pointer transform hover:scale-110 transition duration-300 ease-out'
                      onClick={() =>
                        copyToClipboard(`stakeshariah.com/?ref=${address}`)
                      }
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-10 mb-5'></div>
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
