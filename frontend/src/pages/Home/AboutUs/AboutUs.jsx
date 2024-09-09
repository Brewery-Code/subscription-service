import logo from '../../../assets/img/logo.svg';
import aboutUs from '../../../assets/img/about-us.jpeg';

import Title from '../../../components/UI/Title/Title';

import styles from './AboutUs.module.scss';

export default function AboutUs() {
  return (
    <section className={styles['about-us']}>
      <Title>About us</Title>
      <div className={`${styles['about-us__body']} ${styles.body}`}>
        <div className={`${styles.body__content} ${styles.content}`}>
          <img className={styles.content__logo} src={logo} alt="logo-icon" />
          <p className={styles.content__text}>We offer you a subscription to various media services at the best price.</p>
          <p className={styles.content__text}>We have partnered with several companies to help you find the best prices for your media subscriptions and provide you with the best prices for the Premium
            subscriptions you want.</p>
          <p className={`${styles.content__text} ${styles.content__text_bold}`}>It's simple, fast and economical.</p>
        </div>
        <img className={styles.body__img} src={aboutUs} alt="logo-image" />
      </div>
    </section>
  )
}