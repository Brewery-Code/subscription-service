import styles from './Logo.module.scss';
import logo from '../../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to={'/home'} className={styles.logo}>
      <img className={styles.logo__img} width="55px" height="55px" src={logo} alt="logo-icon" />
      <div className={styles.logo__title}>DiscountsOnServices</div>
    </NavLink>
  )
}