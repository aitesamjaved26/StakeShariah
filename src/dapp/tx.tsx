import { useEffect, useState } from 'react';
import { UserStats } from './wallet';
import { ethers } from 'ethers';
import React from 'react';
import axios from 'axios';
function TxWidget({ value, dollar, date, bnbPrice }) {
  return (
    <div className='flex flex-row justify-between items-start p-2'>
      <div className='flex flex-col'>
        <div className='font-semibold text-2xl'>{value} BNB</div>
        <div className=''>~ {Number(value) * bnbPrice}</div>
      </div>
      <div>{date}</div>
    </div>
  );
}
function TxPage({ status }: { status: UserStats }) {
  const [bnbPrice, setBnbPrice] = useState(0);

  const [currentTab, setTab] = useState('Deposits');
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
  useEffect(() => {
    fetchBNBPrice();
  });
  return (
    <div className='min-w-full'>
      <div className='flex flex-row justify-start items-center'>
        <div className=''>
          <ul className='flex -mb-px'>
            {Object.entries(['Deposits']).map((val) => {
              const activeStyle =
                'cursor-pointer inline-block p-4 text-blue-600 text-lg border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500';
              const inActiveStyle =
                'cursor-pointer inline-block p-4 border-b-2 text-lg border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
              const current =
                val[1] == currentTab ? activeStyle : inActiveStyle;
              return (
                <li
                  key={`dash_tab${val[0]}`}
                  className='mr-2'
                >
                  <div
                    className={current}
                    onClick={() => setTab(val[1])}
                  >
                    {val[1]}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='mt-5 w-full'>
        {currentTab != 'Deposits' && status.withdrawals.length == 0 && (
          <div className='flex flex-col font-poppins font-semibold text-2xl h-64 justify-center items-center'>
            No Transcations yet!
          </div>
        )}
        {currentTab == 'Deposits' && status.deposits.length == 0 && (
          <div className='flex flex-col font-poppins font-semibold text-2xl h-64 justify-center items-center'>
            No Transcations yet!
          </div>
        )}

        {Object.entries(status.deposits).map((val) => {
          const timestampFromSmartContract = ethers.BigNumber.from(
            val[1]['start']
          ); // The timestamp from the smart contract as a string
          const timestampInMilliseconds = timestampFromSmartContract.mul(1000);

          // Step 2: Create a Date object using the converted timestamp
          const date = new Date(timestampInMilliseconds.toNumber());
          const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          const monthName = months[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return (
            <TxWidget
              bnbPrice={bnbPrice}
              key={`{tx_${val}}`}
              date={`${monthName} ${day} ${year} ${hours}:${minutes}`}
              value={`${Number(
                ethers.utils.formatEther(val[1]['amount'] as any)
              ).toFixed(2)}`}
              dollar={`$`}
            ></TxWidget>
          );
        })}
      </div>
    </div>
  );
}
export default TxPage;
