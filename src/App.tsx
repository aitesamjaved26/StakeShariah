import React from "react";
import styles from "./style";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig, useAccount } from "wagmi";
import { bsc } from "viem/chains";

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
} from "./landing/components";
import DesktopUI from "./dapp/desktop";

/**
 *
 *
 *
 */
const projectId = "ac736e4983fc967ec9ac0e8b6b16e287";

const chains = [bsc]
const wagmiConfig = defaultWagmiConfig({ chains, projectId })
createWeb3Modal({ wagmiConfig, projectId, chains })

const App = () => (
  <>
    <WagmiConfig config={wagmiConfig}>
      <HomePage />
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
    <div className="bg-primary w-full overlow-hidden">
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
    <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
      <img
        className="h-44 w-fit cursor-pointer"
        src="bnb_banner.png"
        onClick={() => {
          window.open(
            `https://bscscan.com/address/0x6fac01c4f9fd8846a37952ccaab8d57e43addd93#code`
          );
        }}
      ></img>
    </div>
  );
}
