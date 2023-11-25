import React from 'react';
import styles from '../../style';
import Button from './Button';
import { Accordion } from 'flowbite-react';

function CTA() {
  const fqs = [
    {
      title: 'Capital Withdraw',
      content: `At Stake Shariah, we understand that circumstances can change and our investors may need to access their capital at any time. That's why we offer the unique Capital Withdraw feature, which allows investors to withdraw their capital amount at any time with ease.
  
        To initiate a Capital Withdraw, simply log in to your Stake Shariah account and navigate to the Capital Withdraw page. Here, you can select the amount of capital you wish to withdraw and confirm your request. Our team will process your request within 24-72 hours, and your capital amount will be credited to your BNB wallet`,
    },
    {
      title: `What is the minimum investment amount?`,
      content: 'The minimum investment amount is 0.03 BNB (BEP-20)',
    },

    {
      title: 'Processing Fee',
      content: `At Stake Shariah, we believe in being transparent about all fees and charges associated with our platform. We do not charge any fees on deposits 
        For withdrawal requests, we charge a small processing fee of 3% on the requested amount. This fee helps us cover the costs associated with processing your withdrawal request, including transaction fees and administrative costs
        Please note that the processing fee is deducted from the withdrawal amount, and the remaining amount will be credited to your BNB wallet. For example, if you request a withdrawal of 100 BNB, the processing fee will be 3 BNB, and you will receive 97 BNB in your wallet`,
    },
  ];
  return (
    <div>
      <section
        className={`flex justify-start items-start ${styles.marginY} ${styles.padding} flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      >
        <div className='flex-1 flex flex-col items-start justify-start'>
          <h2 className={styles.heading2}>FAQS</h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Everything you need to start investing
          </p>
        </div>

        {/* <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt--10`}>
          <Button styles={``} />
        </div> */}
        <div className='mt-10'>
          <Accordion>
            {Object.entries(fqs).map((value) => {
              return (
                <Accordion.Panel
                  style={{
                    minWidth: '100%',
                  }}
                  key={`{${value}}`}
                >
                  <Accordion.Title color='white'>
                    {value[1].title}
                  </Accordion.Title>
                  <Accordion.Content>
                    <p className='mb-2 text-white'>
                      <p>{value[1].content}</p>
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

export default CTA;
