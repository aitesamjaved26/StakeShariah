import {
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
} from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { contractABI, contractAddress, myChainId } from '../../models/contract';
import {
  prepareWriteContract,
  readContracts,
  writeContract,
} from 'wagmi/actions';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

function ContractPr() {
  const [monthlyPercentages, setMonthlyPercentages] = useState([]);

  const [contractPercent, setcontractPercent] = useState(0);
  const [showPr, setShowPr] = useState(false);
  const [percentage, setPer] = useState(0);
  const [lastDate, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  async function getInfo() {
    const myContract: any = {
      address: contractAddress,
      abi: contractABI,
    };
    var result = await readContracts({
      contracts: [
        {
          ...myContract,
          functionName: 'getMonthlyPrecentage',
          args: [],
        },
      ],
    });
    console.log(result[0]);
    var rate = ethers.utils.formatUnits(result[0].result[0] as any, 'wei');
    setcontractPercent(rate as any);
    setLoading(false);
    setMonthlyPercentages(result[0].result);
    var nux = ethers.BigNumber.from(result[0].result[1]).toNumber();
    setDate(convertTimestampToDate(nux));
  }
  async function setPercentage() {
    const { request } = await prepareWriteContract({
      chainId: myChainId,
      address: contractAddress,
      abi: contractABI,

      functionName: 'updateBasePercent',
      //@ts-ignore

      args: [Number.parseInt(percentage)],
    });
    console.log(request);
    const { hash } = await writeContract(request);
    setLoading(true);

    getInfo();
    toast.success('perentage updated');
  }
  const handlePreChange = (e) => {
    setPer(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
      <React.Fragment>
        <Modal
          position='center'
          size='sm'
          dismissible={true}
          show={showPr}
          onClose={() => setShowPr(false)}
        >
          <Modal.Header>Set Percentage</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={() => {
                setPercentage();
                setShowPr(false);
                setPer(0);
                event.preventDefault();
                // handleCloseDialog();
                // withdrawToken(account, amount);
                // setAmount('');
              }}
              className='flex flex-col gap-4'
            >
              <div>
                <div className='mb-2 block'>
                  <Label value='Enter Value' />
                </div>
                <TextInput
                  id='amount1'
                  type='number'
                  placeholder='e.g. 50'
                  onChange={handlePreChange}
                  required={true}
                />
              </div>
              <Button type='submit'>Set Percentage</Button>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          {loading && <Spinner></Spinner>}
          {!loading &&
            [['Contract percentage', `${contractPercent} %`]].map((item) => (
              <div
                key={item[0]}
                className='flex flex-row items-center justify-between gap-5'
              >
                <span className='text-2xl'>{item[0]}</span>
                <span>
                  <div className='text-3xl text-sky-600'>{item[1]}</div>
                </span>
              </div>
            ))}
          {!loading && (
            <div className='mt-5 mb-5 text-2xl'>
              <div>Last update {lastDate}</div>
            </div>
          )}
          <Button
            onClick={() => setShowPr(true)}
            className='w-72 mt-5'
          >
            Set Percentage
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ContractPr;
