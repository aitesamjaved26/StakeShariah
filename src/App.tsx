import React from 'react';
import styles from './style';
import { configureChains, createConfig, useAccount, WagmiConfig } from 'wagmi';

import {
  Navbar,
  Hero,
  Stats,
  Billing,
  CardDeal,
  Testimonials,
  Business,
  Clients,
  CTA,
  Footer,
} from './landing/components';
import { bsc } from 'wagmi/chains';
import {InjectedConnector} from 'wagmi/connectors/injected'
import {alchemyProvider} from "wagmi/providers/alchemy"
import {publicProvider} from "wagmi/providers/public"

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import DesktopUI from './dapp/desktop';

/**
 *
 *
 *
 */

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "ac736e4983fc967ec9ac0e8b6b16e287";
const alchemyApiKey = "zFtQZoE1DUn-8er5Os1mHh6GWpMfASiu"
const { publicClient, chains, webSocketPublicClient } = configureChains([bsc], [ alchemyProvider({apiKey: alchemyApiKey}), publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "shariah",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});



const App = () => (
  <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <HomePage />
      </RainbowKitProvider>
    </WagmiConfig>
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
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/* Components */}
          {/* <Stats /> */}
          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          {/* <Clients /> */}
          <CTA />
          <CX></CX>
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
            `https://bscscan.com/address/0xaa3d09edf8f3a3a1eb64f0ebe07487ffe423746f`
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
