import React from 'react';
import { card } from '../../assets';
import styles, { layout } from '../../style';
import Button from './Button';
import { useTranslation } from 'react-i18next';

function CardDeal() {
  const { t } = useTranslation();
  return (
    <section
      id='share&earn'
      className={layout.section}
    >
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          {t('deal')} <br className='sm:block hidden' />
          {t('deal2')}
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>{t('deal3')}</p>

        <Button styles='mt-10' />
      </div>

      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='card'
          className='w-[100%] h-[100%]'
        />
      </div>
    </section>
  );
}

export default CardDeal;
