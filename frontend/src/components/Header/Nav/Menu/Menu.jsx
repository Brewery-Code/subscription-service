import { useState } from 'react';

import arrow from '../../../../assets/icons/arrow-slim.svg';
import about from '../../../../assets/icons/about.svg';
import FAQ from '../../../../assets/icons/FAQ.svg';
import home from '../../../../assets/icons/home.svg';
import support from '../../../../assets/icons/support.svg';

import Subscription from './Subscription/Subscription';
import MenuItem from './MenuItem/MenuItem';

import styles from './Menu.module.scss';

export default function Menu() {
  const [state, setState] = useState(false);

  function toggleState() {
    setState(prevState => !prevState);
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function openMenu() {
    toggleState();
  }

  return (
    <ul className={styles.menu}>
      <li className={styles.subscriptions}
        onClick={isMobile() ? openMenu : undefined}
        onMouseEnter={!isMobile() ? openMenu : undefined}
        onMouseLeave={!isMobile() ? openMenu : undefined}
      >
        <button className={styles.subscriptions__button}>
          <h3>Subscriptions</h3>
          <img className={styles['subscriptions__button-arrow']} src={arrow} alt="arrow-icon" />
        </button>
        <ul className={`${styles.subscriptions__menu} ${state ? styles.subscriptions__menu_active : ''}`}>
          <Subscription><a href="">Netflix</a></Subscription>
          <Subscription><a href="">YouTube Premium</a></Subscription>
          <Subscription><a href="">Spotify</a></Subscription>
        </ul>
      </li>
      <MenuItem text="Home" img={home} link="#" alt="Home-icon" burger={true} />
      <MenuItem text="FAQ" img={FAQ} link="#" alt="FAQ-icon" />
      <MenuItem text="Support" img={support} link="#" alt="Support-icon" />
      <MenuItem text="About" img={about} link="#" alt="About-icon" />
    </ul>
  )
}
