import logo from '../../../../assets/icons/logo-footer.svg';

import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.logo__link} href="">
        <img className={styles.logo__img} src={logo} alt="logo-icon" />
        <div className={styles.logo__title}>DiscountsOnServices</div>
      </a>
      <p className={styles.logo__text}>It's simple, fast and economical</p>
    </div>
  )
}