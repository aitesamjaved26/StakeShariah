import React from 'react';
import { useWeb3Modal } from '@web3modal/react';

function Button({ styles }) {
  const { open, close } = useWeb3Modal();

  return (
    <div>
      <button
        onClick={() => open()}
        type='button'
        className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-lg ${styles}`}
      >
        Get Started
      </button>
    </div>
  );
}
export default Button;
