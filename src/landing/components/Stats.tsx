import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-reveal';
import styles from '../../style';
import { readContracts } from 'wagmi';
import { contractABI, contractAddress } from '../../models/contract';
import { ethers } from 'ethers';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Stats() {
  const [totalDeposit, setTotal] = useState('');
  const [users, Setusers] = useState('');
  const [bnbPrice, setBnbPrice] = useState(0);
  const { t } = useTranslation();

  async function getStats() {
    const myContract: any = {
      address: contractAddress,
      abi: contractABI,
    };
    const data = await readContracts({
      contracts: [
        {
          ...myContract,
          functionName: 'totalInvested',
          args: [],
        },
        //total number of deposits
        {
          ...myContract,
          functionName: 'totalDeposits',
          args: [],
        },
      ],
    });
    var totalInvested = ethers.utils.formatEther(data[0].result as any);
    var usrnum = ethers.utils.formatUnits(data[1].result as any, 'wei');

    setTotal(totalInvested);
    Setusers(usrnum);
  }
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
  //
  useEffect(() => {
    fetchBNBPrice();
    getStats();
  }, []);
  var stats = [
    {
      id: 'stats-1',
      title: t('stats1'),
      value: users,
    },
    {
      id: 'stats-2',
      title: t('stats2'),
      value: `${Number(totalDeposit).toFixed(2)} BNB`,
    },
    {
      id: 'stats-3',
      title: t('stats3'),
      value: '$' + `${(bnbPrice * Number(totalDeposit)).toFixed(0)}`,
    },
  ];

  return (
    <section
      className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`flex-1 flex justify-start items-center flex-row m-3`}
        >
          <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'>
            <Zoom>{stat.value}</Zoom>
          </h4>
          <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3'>
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Stats;
