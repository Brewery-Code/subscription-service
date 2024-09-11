import { useState } from 'react';
import React from 'react';

import arrow from '../../../../assets/icons/arrow-slim.svg';
import about from '../../../../assets/icons/about.svg';
import FAQ from '../../../../assets/icons/FAQ.svg';
import home from '../../../../assets/icons/home.svg';
import support from '../../../../assets/icons/support.svg';

import Subscription from './Subscription/Subscription';
import MenuItem from './MenuItem/MenuItem';

import styles from './Menu.module.scss';

export default function Menu({ services }) {
  const [subscriptionMenuState, setSubscriptionMenuState] = useState(false);

  const [arrowRotate, setArrowRotate] = useState(0);
  const rotateArrow = () => {
    setArrowRotate(prev => (prev === 0 ? 90 : 0));
  };

  function toggleState() {
    setSubscriptionMenuState(prevState => !prevState);
    rotateArrow();
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  return (
    <>
      <ul className={styles.menu}>
        <li className={styles.subscriptions}
          onClick={isMobile() ? toggleState : undefined}
          onMouseEnter={!isMobile() ? toggleState : undefined}
          onMouseLeave={!isMobile() ? toggleState : undefined}
        >
          <button className={styles.subscriptions__button}>
            <h3>Subscriptions</h3>
            <img className={styles['subscriptions__button-arrow']}
              src={arrow}
              alt="arrow-icon"
              style={isMobile ? { transform: `rotate(${arrowRotate}deg)` } : {}}
            />
          </button>
          <ul className={`${styles.subscriptions__menu} ${subscriptionMenuState ? styles.subscriptions__menu_active : ''}`}>
            {services?.map((subscription) => (
              <Subscription key={subscription.id}><a href="#">{subscription.name}</a></Subscription>
            ))}
          </ul>
        </li>
        <MenuItem text="Home" img={home} link="/home" alt="Home-icon" burger={true} />
        <MenuItem text="FAQ" img={FAQ} link="/faq" alt="FAQ-icon" />
        <MenuItem text="Support" img={support} link="/support" alt="Support-icon" />
        <MenuItem text="About" img={about} link="/about" alt="About-icon" />
      </ul>
      <ul className={styles['subscriptions-menu-burger']}>
        {services?.map((subscription) => (
          <Subscription key={subscription.id}><a href="#">{subscription.name}</a></Subscription>
        ))}
      </ul>
    </>
  )
}
