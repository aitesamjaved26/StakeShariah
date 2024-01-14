import React from 'react';
import { card } from '../../assets';
import styles, { layout } from '../../style';
import Button from './Button';

const CardDeal = () => (
  <section
    id='share&earn'
    className={layout.section}
  >
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Share and Earn <br className='sm:block hidden' />
        instantly .
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Share Your link and earn instantly on every investment up to 11%, once
        they use your link you will earn everytime they invest.
      </p>

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

export default CardDeal;
