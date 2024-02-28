import React from 'react';
import { robot } from '../../assets';
import styles from '../../style';
import GetStarted from './GetStarted';
import Typical from 'react-typical';
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { open } = useWeb3Modal();
  const { t } = useTranslation();

  return (
    <section
      id='home'
      className={`flex md:flex-row flex-col sm:py-8 py-6`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-4`}
      >
        <div className='text-5xl text-white text-bold'></div>

        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className=' flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[80px]'>
            {t('Unleash')}
            <br className='sm:block hidden' />{' '}
            <span className='text-gradient2'>{t('ThePower')}</span>{' '}
          </h1>
        </div>

        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>
          {t('DeFiInvesting')}
        </h1>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {t('investwithpeace')}
        </p>
        <div
          id='connectxbutton'
          className='mt-5'
        >
          <Web3Button></Web3Button>
        </div>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={robot}
          alt='billing'
          className='w-[100%] relatinve z-[5]'
        />
        <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
        <div className='absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient' />
        <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
      </div>
    </section>
  );
}

export default Hero;
