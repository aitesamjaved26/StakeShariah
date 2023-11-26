import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import {
  AiFillAccountBook,
  AiOutlinePercentage,
  AiOutlinePlusCircle,
  AiFillCrown,
} from 'react-icons/ai';
import { FaBan } from 'react-icons/fa';
import { GoBlocked } from 'react-icons/go';
import BlackList from './admin/blacklist';
import ContractPr from './admin/precentage';
import { InvestUI } from './wallet';
import CapitalRequests from './admin/requests';
import LeaderInvest from './admin/leaderInvest';

function AdminPanel() {
  const [tab, setTab] = useState('Invest');
  const [size, setSize] = useState('md');
  const [modalTitle, setTitle] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [myModal, setModal] = useState(null);
  return (
    <div>
      {showDialog && (
        <Modal
          show={showDialog}
          position={'center'}
          size={size}
          dismissible={true}
          onClose={() => setShowDialog(false)}
        >
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>{myModal}</Modal.Body>
        </Modal>
      )}
      <div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div className='flex flex-row p-2 gap-2 items-center justify-center gap-2 min-h-72 rounded bg-gray-50 dark:bg-gray-800'>
            <div className='flex flex-wrap gap-4 justify-center'>
              {Object.entries([
                {
                  title: 'Deposit No fees',
                  icon: (
                    <AiOutlinePlusCircle
                      size={35}
                      color='#623CE7'
                    ></AiOutlinePlusCircle>
                  ),
                  widget: (
                    <InvestUI onCancel={() => setShowDialog(false)}></InvestUI>
                  ),
                },
                {
                  title: 'Leader Invest',
                  size: '2xl',
                  icon: (
                    <AiFillCrown
                      color='yellow'
                      size={35}
                    ></AiFillCrown>
                  ),
                  widget: (
                    <LeaderInvest
                    onCancel={() => setShowDialog(false)}
                    ></LeaderInvest>
                  ),
                },
                {
                  title: 'Block User',
                  icon: (
                    <FaBan
                      color='#623CE7'
                      size={35}
                    ></FaBan>
                  ),
                  widget: (
                    <BlackList
                      typex='block'
                      onCancel={() => setShowDialog(false)}
                    ></BlackList>
                  ),
                },
                {
                  title: 'UnBlock',
                  icon: (
                    <GoBlocked
                      color='#25D366'
                      size={35}
                    ></GoBlocked>
                  ),
                  widget: (
                    <BlackList
                      typex='unblock'
                      onCancel={() => setShowDialog(false)}
                    ></BlackList>
                  ),
                },
                {
                  title: 'Capital Requests',
                  size: '4xl',
                  icon: (
                    <AiFillAccountBook
                      color='#0284c7'
                      size={35}
                    ></AiFillAccountBook>
                  ),
                  widget: <CapitalRequests></CapitalRequests>,
                },
              ]).map((val) => {
                return (
                  <div
                    onClick={() => {
                      if (val[1].size != null) {
                        setSize(val[1].size);
                      } else {
                        setSize('md');
                      }
                      setTitle(val[1].title);
                      setShowDialog(true);
                      setModal(val[1].widget);
                    }}
                    className='flex flex-col w-72 md:w-56 cursor-pointer shadow-md font-poppins text-[#1b1b1b] font-semibold text-xl p-4 hover:bg-gray-300 bg-white items-center'
                    key={`${val[0]}`}
                  >
                    {val[1].icon}
                    {val[1].title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
