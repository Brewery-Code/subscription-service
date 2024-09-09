import { useState, useEffect } from 'react';
import axios from 'axios';

import Title from '../../../components/UI/Title/Title'

import styles from './Subscriptions.module.scss';
import Button from '../../../components/UI/Button/Button';

export default function Subscriptions() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/services')
      .then(res => {
        const data = res.data;
        setDetails(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.subscriptions}>
      <Title>Choose a subscription</Title>
      <div className={styles.subscriptions__list}>
        {details?.map((subscription) => (
          <div className={`${styles.subscription}`} key={subscription.id}>
            <div className={styles.subscription__content}>
              <h3 className={`${styles.subscription__title}`}>{subscription.name}</h3>
              {/* <h3 className={`${styles.subscription__title_shortcut}`}>{subscription.name}</h3> */}
              <p className={styles.subscription__description}>
                {subscription.description}
              </p>
              <Button type={'learn-more'}>Learn more</Button>
            </div>
            <div className={`${styles.subscription__img}`}
              style={{ backgroundColor: subscription.bg_color }}>
              <img className={`${styles.subscription__logo}`} src={subscription.image} alt="subscription-image" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}