import Title from '../../components/UI/Title/Title';
import Invite from '../Home/Invite/Invite';
import FAQ from '../Home/FAQ/FAQ';

import checkMarkImg from '../../assets/icons/check-mark.svg';

import styles from './Subscription.module.scss';

export default function Subscription({ subscription, subscriptionPlan, faq }) {
  if (!Array.isArray(subscriptionPlan)) {
    console.error('subscriptionPlan is not an array:', subscriptionPlan);
    return null;
  }

  const durations = [...new Set(subscriptionPlan.map(item => item.duration))];

  return (
    <section className={styles.subscription}>
      <Title>Choose a {subscription.name} Plan</Title>
      <p className={styles.subscription__subtitle}>Select the subscription type for a period of <span>{durations} months</span></p>
      <div className={styles.plan}>
        <div className={styles.plan__list}>
          {subscriptionPlan?.map((item) => (
            <div className={styles.plan__item} key={item.id}>
              <h2 className={styles.plan__title}>{item.name}</h2>
              <span className={styles.plan__line}></span>
              <div className={styles['plan__description-list']}>
                <div className={styles.plan__description}>
                  <img src={checkMarkImg} alt="check-mark" />
                  <p>Listen to music without ads, in the background and offline</p>
                </div>
                <div className={styles.plan__description}>
                  <img src={checkMarkImg} alt="check-mark" />
                  <p>Listen to music without ads, in the background and offline</p>
                </div>
              </div>
              <div className={styles.plan__price}>
                <span>$</span>
                <h3>{item.price}</h3>
              </div>
              <button className={styles.plan__button}>Get started</button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.subscription__invite}>
        <Invite />
      </div>
      <div className={styles.subscription__faq}>
        <FAQ faq={faq} />
      </div>
    </section>
  )
}