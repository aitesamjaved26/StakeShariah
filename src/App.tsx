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

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import DesktopUI from './dapp/desktop';
import { contractAddress } from './models/contract';

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

// function CX() {
//   return (
//     <div className='flex flex-col md:flex-row gap-10 justify-center items-start'>
//       <img
//         className='h-44 w-fit cursor-pointer'
//         src='bnb_banner.png'
//         onClick={() => {
//           window.open(`#`);
//         }}
//       ></img>
//       <img
//         className='h-44 w-fit cursor-pointer'
//         src='audit.png'
//         onClick={() => {
//           window.open(`#`);
//         }}
//       ></img>
//     </div>
//   );
// }
//https://solidaudit.xyz/audit?id=b6466fba