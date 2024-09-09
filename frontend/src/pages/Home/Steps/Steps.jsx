import step1 from '../../../assets/img/step-1.svg';
import step2 from '../../../assets/img/step-2.svg';
import step3 from '../../../assets/img/step-3.svg';

import Title from '../../../components/UI/Title/Title';

import styles from './Steps.module.scss';

export default function Steps() {
  return (
    <section className={styles.steps}>
      <Title>How it works?</Title>
      <div className={styles.steps__list}>
        <div className={`${styles.steps__step} ${styles.step}`}>
          <h3 className={styles.step__title}>Step 1</h3>
          <img className={styles.step__img} src={step1} alt="step-icon" />
          <p className={styles.step__content}>Enter your account information</p>
        </div>
        <div className={`${styles.steps__step} ${styles.step}`}>
          <h3 className={styles.step__title}>Step 2</h3>
          <img className={styles.step__img} src={step2} alt="step-icon" />
          <p className="step__content">Select the desired subscription and plan</p>
        </div>
        <div className={`${styles.steps__step} ${styles.step}`}>
          <h3 className={styles.step__title}>Step 3</h3>
          <img className={styles.step__img} src={step3} alt="step-icon" />
          <p className={styles.step__content}>Pay your bill with PayPal</p>
        </div>
      </div>
    </section>
  )
}