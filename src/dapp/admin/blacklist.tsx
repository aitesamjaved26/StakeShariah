import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { contractABI, contractAddress, myChainId } from '../../models/contract';
import { getContract } from 'viem';
import { useAccount } from 'wagmi';
import { prepareWriteContract, writeContract } from 'wagmi/actions';
import { useState } from 'react';
import React from 'react';

function BlackList({
  onCancel,
  typex,
}: {
  onCancel: any;
  typex: 'block' | 'unblock';
}) {
  const { address } = useAccount();
  const [usrAdd, setUsrAdd] = useState('');

  async function freeze(useraddr) {
    console.log('hello');
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        //@ts-ignore
        functionName: 'blacklistAddress',
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [useraddr],
      });
      console.log(request);
      const { hash } = await writeContract(request);
      onCancel();
    } catch (e) {
      console.log(e);
    }
  }
  async function unblock(useraddr) {
    console.log('hello');
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        //@ts-ignore
        functionName: 'unblacklistAddress',
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [useraddr],
      });
      console.log(request);
      const { hash } = await writeContract(request);
      onCancel();
    } catch (e) {
      console.log(e);
    }
  }
  const handlePreChange = (e) => {
    setUsrAdd(e.target.value);
  };
  return (
    <div>
      <form
        className='flex flex-col gap-4'
        onSubmit={() => {
          event.preventDefault();
        }}
      >
        <div>
          <div className='mb-2 block'>
            <Label value='Enter Address' />
          </div>
          <TextInput
            id='address1'
            type='text'
            placeholder='Enter wallet address'
            required={true}
            onChange={handlePreChange}
          />
        </div>
        <div className='flex justify-center gap-4'>
          <Button
            color='failure'
            type='submit'
            onClick={() => {
              if (typex == 'block') {
                freeze(usrAdd);
              } else {
                unblock(usrAdd);
              }
            }}
          >
            Yes, I'm sure
          </Button>
          <Button
            color='gray'
            onClick={onCancel}
          >
            No, cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
export default BlackList;
