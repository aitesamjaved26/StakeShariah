import { useState } from 'react';
import { navLinks } from '../../constants';
import { close, logo, menu } from '../../assets';
import React from 'react';
import { FaIcons, FaGlobe } from 'react-icons/fa';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LanguageModal = ({ onClickClose }) => {
  const langs = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'tr', name: 'Turkey' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese (中文)' },
  ];
  return (
    <div>
      {langs.map((val) => {
        return (
          <div
            onClick={() => {
              i18n.changeLanguage(val.code);
              onClickClose();
            }}
            className='cursor-pointer h-8 hover:bg-gray-200 p-2 rounded-sm'
          >
            {val.name}
          </div>
        );
      })}
    </div>
  );
};
const Navbar = () => {
  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      {dialog && (
        <Modal
          show={dialog}
          position={'center'}
          size={'sm'}
          dismissible={true}
          onClose={() => setDialog(false)}
        >
          <Modal.Header>{t('lang')}</Modal.Header>
          <Modal.Body>
            {
              <LanguageModal
                onClickClose={() => setDialog(false)}
              ></LanguageModal>
            }
          </Modal.Body>
        </Modal>
      )}
      <div className='flex flex-row justify-between items-center cursor-pointer'>
        <img
          src={`logo.png`}
          alt='hoobank'
          className='w-[32px] h-[32px]'
        ></img>
        <div className='ml-2 text-2xl text-gradient2 font-poppins font-medium uppercase'>
          Stake Shariah{' '}
        </div>
      </div>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks(t).map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              index === navLinks(t).length - 1 ? 'mr-0' : 'mr-10'
            } text-white`}
          >
            <a
              href={`#${nav.id}`}
              onClick={() => {
                if (nav.id == 'presentation') {
                  window.open('/presentation.pdf');
                }
              }}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
      <div
        className='ml-10 cursor-pointer'
        onClick={() => {
          setDialog(true);
        }}
      >
        <FaGlobe color='white'></FaGlobe>
      </div>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? 'flex' : 'hidden'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks(t).map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  index === navLinks(t).length - 1 ? 'mr-0' : 'mb-4'
                } text-white`}
              >
                <a
                  href={`#${nav.id}`}
                  onClick={() => {
                    if (nav.id == 'presentation') {
                      window.open('/presentation.pdf');
                    }
                  }}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
