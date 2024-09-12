import { useState } from 'react';

import startupImg from '../../../assets/img/startup.jpeg';

import SubscriptionApplication from '../../../components/Modals/SubsciptionApplication';
import Button from '../../../components/UI/Button/Button';

import styles from './Startup.module.scss';

export default function Startup() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => (!prev));
  };

  return (
    <section className={styles.startup}>
      <div className={styles.startup__body}>
        <div className={`${styles.startup__item} ${styles.content}`}>
          <h1 className={styles.content__title}>Start enjoying a benefit of up to 50%</h1>
          <p className={styles.content__subtitle}>You have always wanted to get the same product at a special price for you, without haggling - and it is yours.</p>
          <Button type='start-using' onClick={toggleModal}>Start using</Button>
          <SubscriptionApplication isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
        <div className={`${styles.startup__item} ${styles.img}`}>
          <img className={styles.img} src={startupImg} alt="subscriptions-image" />
        </div>
      </div>
    </section>
  )
}