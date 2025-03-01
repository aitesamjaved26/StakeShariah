import React from 'react';
import { logo } from '../../assets';
import styles from '../../style';
import { footerLinks, socialMedia } from '../../constants';
import { contractAddress } from '../../models/contract';
const currentYear = new Date().getFullYear();
export const LogoLinks = () => (
  // <div>
  //   <div className='flex flex-col lg:flex-row gap-10 mr-10 justify-center items-center'>
  //     <img
  //       onClick={() => {
  //         window.open(`https://bscscan.com/address/${contractAddress}`);
  //       }}
  //       className='h-32 w-48 cursor-pointer'
  //       src='bnb.svg'
  //     ></img>
  //     {/* <img
  //       onClick={() => {
  //         window.open('https://solidaudit.xyz/audit?id=b6466fba');
  //       }}
  //       className='h-full w-56 cursor-pointer'
  //       src='audit.png'
  //     ></img> */}
  //   </div>
  // </div>
);
const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div
      className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}
    ></div>

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
