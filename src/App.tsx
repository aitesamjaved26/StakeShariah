import React from 'react';
import styles from './style';
import { configureChains, createConfig, useAccount, WagmiConfig } from 'wagmi';
import './i18n'; // Import the i18n setup file

import {
  Navbar,
  Hero,
  Stats,
  Billing,
  Testimonials,
  Business,
  Clients,
  CTA,
  Footer,
  CardDeal,
} from './landing/components';
import { bsc } from 'wagmi/chains';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import DesktopUI from './dapp/desktop';
import { contractAddress } from './models/contract';
import i18n from './i18n';

/**
 *
 *
 *
 */
const projectId = 'fb15601992f73295b517e887f1b09c43';

const chains = [bsc];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => (
  <>
    <WagmiConfig config={wagmiConfig}>
      <HomePage />
    </WagmiConfig>

    <Web3Modal
      projectId={projectId}
      //defaultChain={bsc}
      ethereumClient={ethereumClient}
    />
  </>
);

export default App;

function HomePage() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <DesktopUI></DesktopUI>;
  }
  return (
    <div className='bg-primary w-full overlow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}></div>

      <div className={`bg-gradient-to-tr from-indigo-500 ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className={`mr-5 md:mr-10 ml-5 md:ml-10`}>
            <Navbar />
          </div>
          <Hero />
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/* Components */}
          <div className='mt-10'>
            <Stats />
          </div>
          <Business />
          <Billing />
          <CardDeal></CardDeal>
          <Testimonials />
          {/* <Clients /> */}
          <CTA />
          {/* <CX></CX> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

function CX() {
  return (
    <div className='flex flex-col md:flex-row gap-10 justify-center items-start'>
      <img
        className='h-44 w-fit cursor-pointer'
        src='bnb_banner.png'
        onClick={() => {
          window.open(
            `https://bscscan.com/address/0x1adb950d8bb3da4be104211d5ab038628e477fe6`
          );
        }}
      ></img>
      <img
        className='h-44 w-fit cursor-pointer'
        src='audit.png'
        onClick={() => {
          window.open(`https://solidaudit.xyz/audit?id=b6466fba`);
        }}
      ></img>
    </div>
  );
}
