import React from 'react';
import { logo } from '../../assets';
import styles from '../../style';
import { footerLinks, socialMedia } from '../../constants';
const currentYear = new Date().getFullYear();

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className='flex-1 flex flex-row justify-start mr-10 justify-center'>
        <img
          onClick={() => {
            window.open(
              'https://bscscan.com/address/0x54866a92b621f63cb36c7213442e7d811387cd7e'
            );
          }}
          className='h-32 w-48 cursor-pointer'
          src='bnb.svg'
        ></img>
        {/* <img
          onClick={() => {}}
          className='h-32 w-48 cursor-pointer'
          src='metamask.svg'
        ></img> */}
      </div>
    </div>

    <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3r45]'>
      <p className='font-poppins font-normal text-center text-[18px] leading-[27px] text-white'>
        {currentYear} Stake Shariah. All Rights Reserved.
      </p>

      <div className='flex flex-row md:mt-0 mt-6'>
        {socialMedia.map((social, index) => (
          <div
            onClick={() => {
              window.open(social.link);
            }}
          >
            <img
              key={social.id}
              src={social.icon}
              //link={social.link}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? 'mr-2' : 'mr-0'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
