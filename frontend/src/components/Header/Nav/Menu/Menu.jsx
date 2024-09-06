import arrow from '../../../../assets/icons/arrow-slim.svg';
import about from '../../../../assets/icons/about.svg';
import FAQ from '../../../../assets/icons/FAQ.svg';
import home from '../../../../assets/icons/home.svg';
import support from '../../../../assets/icons/support.svg';

import styles from './Menu.module.scss';

function Subscription() {
  return (
    <div className="">Test</div>
  )
}

export default function Menu() {
  return (
    <ul className={styles.menu}>
      <li className={`${styles.menu__item} ${styles.subscriptions}`}>
        <button className={styles.subscriptions__button}>
          <h3>Subscriptions</h3><img className={styles['subscriptions__button-arrow']} src={arrow} alt="arrow-icon" />
        </button>
        <ul className={styles.subscriptions__menu}>
          <Subscription />
        </ul>
      </li>
      <li className={`${styles.menu__item} ${styles.menu__item_burger}`}><img className={styles['{styles.menu__item_burger-icon}']} src={home} alt="Home-icon" /><a href="">Home</a></li>
      <li className={styles.menu__item}><img className={styles['{styles.menu__item_burger-icon}']} src={FAQ} alt="FAQ-icon" /><a href="">FAQ</a></li>
      <li className={styles.menu__item}><img className={styles['{styles.menu__item_burger-icon}']} src={support} alt="support-icon" /><a href="">Support</a></li>
      <li className={styles.menu__item}><img className={styles['{styles.menu__item_burger-icon}']} src={about} alt="about-icon" /><a href="">About</a></li>
    </ul>
  )
}