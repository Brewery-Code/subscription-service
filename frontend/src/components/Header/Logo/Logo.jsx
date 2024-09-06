import styles from './Logo.module.scss';
import logo from '../../../assets/img/logo.svg';

export default function Logo() {
  return (
    <a href="index.html" className={styles.logo}>
      <img className={styles.logo__img} width="55px" height="55px" src={logo} alt="logo-icon" />
      <div className={styles.logo__title}>DiscountsOnServices</div>
    </a>
  )
}