import styles, { layout } from '../../style';
import Button from './Button';
import { features } from '../../constants';
import { Slide } from 'react-reveal';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Destructing
function FeatureCard({ icon, title, content, index }) {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        index !== features.length - 1
      } ? "mb-6" : "mb-0" feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <img
          src={icon}
          alt='icon'
          className='w-[50%] h-[50%] object-contain'
        />
      </div>
      <div className='flex-1 flex flex-col ml-3'>
        <h4 className='font-poppins font-semibold text-white text-[20px] leading-[23px] mb-1'>
          {title}
        </h4>
        <p className='font-poppins text-white text-[16px] leading-[24px] mb-1 mt-1'>
          {content}
        </p>
      </div>
    </div>
  );
}

function Business() {
  const { t } = useTranslation();
  return (
    <section
      id='features'
      className={layout.section}
    >
      <Slide left>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading2}>
            🚀 {t('bussines')} <br className='sm:block hidden' />
            {t('bussines2')}
          </h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            {t('bussiness3')}
          </p>

          <Button styles='mt-10' />
        </div>
      </Slide>

      <Slide right>
        <div className={`${layout.sectionImg} flex-col`}>
          {features(t).map((feature, index) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </Slide>
    </section>
  );
}

export default Business;
