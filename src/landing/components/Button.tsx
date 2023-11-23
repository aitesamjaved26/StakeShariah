import React from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

function Button({ styles }) {
  const {openConnectModal}= useConnectModal()
  return (
    <div>
      <button
        onClick={() => openConnectModal()}
        type='button'
        className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-lg ${styles}`}
      >
        Get Started
      </button>
    </div>
  );
}
export default Button;
