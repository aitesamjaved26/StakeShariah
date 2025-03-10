import React from 'react';
import { feedback } from '../../constants';
import styles from '../../style';
import FeedbackCard from './FeedbackCard';
import { useTranslation } from 'react-i18next';

function Testimonials() {
  const { t } = useTranslation();
  return (
    <section
      id='clients'
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      {/* TODO */}
      <div className='absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient' />

      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h1 className={styles.heading2}>
          {t('how')} <br className='sm:block hidden' />
        </h1>
        <div className='w-full md:mt-0 mt-6'>
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            {/* Everything you need to accept card payments and grow your business
            anywhere on the planet. */}
          </p>
        </div>
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]'>
        {feedback(t).map((card) => (
          <FeedbackCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
