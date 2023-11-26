import { useAccount } from 'wagmi';
import { UserStats, copyToClipboard } from './wallet';
import React from 'react';
import { card } from '../assets';
import styles, { layout } from '../style';
import { Button } from 'flowbite-react';

function RefferalUI({ status }: { status: UserStats }) {
  const { address } = useAccount();
  return (
    <section
      id='share&earn'
      className={layout.section}
    >
      <div className={layout.sectionInfo}>
        {
          <div className=''>
            <div className='flex flex-col gap-10 p-5 justify-center items-center'>
              <div className='flex flex-col h-fit w-fit p-4 gap-5 shadow-2xl bg-white rounded-2xl'>
                <div>
                  <div className='text-2xl font-bold font-poppins'>
                    Share & Earn
                  </div>
                  <div>
                    Earn crypto rewards by referring friends! Share your unique
                    link, they invest, you both get rewarded. Start now!
                  </div>
                  <div className='mt-5'>
                    <div className='text-xl font-semibold'>
                      Your Referral rewards:
                    </div>
                    <div className='text-2xl font-bold font-poppins'>
                      {`${status.getUserReferralsStats}`} BNB
                    </div>
                  </div>
                  <input
                    className='w-full mt-5 h-14 p-2 border-none bg-gray-300 rounded-lg'
                    readOnly
                    value={`stakeshariah.com/?ref=${address}`}
                  ></input>
                </div>
                <div className='flex flex-col justify-center items-center mt-5 mb-5'>
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
              </div>
            </div>
          </div>
        }
      </div>

      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='card'
          className='w-[100%] h-fit'
        />
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
