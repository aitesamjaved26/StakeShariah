import React from 'react';

function FAQSection() {
  const fqs = [
    {
      title: 'Capital Withdraw',
      content: `At Stake Shariah, we understand that circumstances can change and our investors may need to access their capital at any time. That's why we offer the unique Capital Withdraw feature, which allows investors to withdraw their capital amount at any time with ease.
  
        To initiate a Capital Withdraw, simply log in to your Stake Shariah account and navigate to the Capital Withdraw page. Here, you can select the amount of capital you wish to withdraw and confirm your request. Our team will process your request within 24-72 hours, and your capital amount will be credited to your BNB wallet`,
    },
    {
      title: `What is the minimum investment amount?`,
      content: 'The minimum investment amount is 0.04 BNB (BEP-20)',
    },

    {
      title: 'Processing Fee',
      content: `At Stake Shariah, we believe in being transparent about all fees and charges associated with our platform. We charge 3% on deposits 
        For withdrawal requests, we charge a small processing fee of 5% on the requested amount. This fee helps us cover the costs associated with processing your withdrawal request, including transaction fees and administrative costs
        Please note that the processing fee is deducted from the withdrawal amount, and the remaining amount will be credited to your BNB wallet. For example, if you request a withdrawal of 1 BNB, the processing fee will be 0.05 BNB, and you will receive 0.95 BNB in your wallet`,
    },

    {
      title: 'Why the Balance on contract is always low?',
      content: "Traditional Ponzi schemes trap money within the contract, simply moving it between users to create an illusion of growth. StakeShariah operates differently. Your investment, minus the referral bonus, is allocated to two separate wallets: one for administration and one for marketing. These funds are used to generate real profits through StakeShariah's own revenue streams, which are then distributed back to users transparently and fairly",
    },

    {
      title: 'How are profits generated and shared with users?',
      content: "StakeShariah utilizes various revenue streams to generate profits, including staking, yield farming, and strategic partnerships. These profits are then distributed proportionally among all active users, ensuring everyone benefits from the platform's success.",
    },
  ];
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-3xl text-white font-semibold mb-5'>FAQS</div>

      {/* <Accordion>
        {Object.entries(fqs).map((value) => {
          return (
            <Accordion.Panel
              style={{
                minWidth: '100%',
              }}
              key={`{${value}}`}
            >
              <Accordion.Title color='white'>{value[1].title}</Accordion.Title>
              <Accordion.Content>
                <p className='mb-2'>
                  <p>{value[1].content}</p>
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          );
        })}
      </Accordion> */}
    </div>
  );
}
export default FAQSection;
