import React from 'react';
import { logo } from '../../assets';
import styles from '../../style';
import { footerLinks, socialMedia } from '../../constants';
const currentYear = new Date().getFullYear();

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className='flex-1 flex flex-col justify-start mr-10'>
        <div className='ml-2 text-2xl text-gradient2 cursor-pointer font-poppins font-medium uppercase'>
          Stake Shariah{' '}
        </div>
      </div>

      {/* <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
        {footerLinks.map((footerLink) => (
          <div
            key={footerLink.title}
            className='flex flex-col ss:my-0 my-4 min-w-[150px]'
          >
            <h4 className='cursor-pointer font-poppins font-medium text-[18px] leading-[27px] tex-white'>
              {footerLink.title}
            </h4>

            <ul className='list-none mt-4'>
              {footerLink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`cursor-pointer font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor pointer ${
                    index !== footerLink.links.length - 1 ? 'mb-4' : 'mb-0'
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div> */}
      <div>
        <a
          href='/presentation.pdf'
          download
        >
          <button
            type='button'
            className='py-4 px-6 bg-green-gradient font-poppins font-medium text-[18px] text-white outline-none rounded-lg mt-4'
          >
            Presentation
          </button>
        </a>
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
