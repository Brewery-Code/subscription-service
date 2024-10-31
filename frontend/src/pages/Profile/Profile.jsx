import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Request from '../Home/Request/Request';
import Info from './Info/Info';
import Subscriptions from './Subscriptions/Subscriptions';

import exitImg from '../../assets/icons/exit.svg';
import settingsImg from '../../assets/icons/settings.svg';
import subscriptionsImg from '../../assets/icons/subscriptions.svg';

import styles from './Profile.module.scss';

export default function Profile() {
  const [isMenuItemActive, setMenuItemActive] = useState('info');
  const toggleMenuItemActive = (item) => {
    setMenuItemActive(item);
  }

  const chosenMenuItem = () => {
    switch (isMenuItemActive) {
      case 'info':
        return <Info />;
      case 'subscriptions':
        return <Subscriptions />
      default:
        return <Info />;
    }
  }

  return (
    <section className={styles.profile}>
      <div className={styles.profile__heading}>
        <h1 className={styles.profile__title}>Personal data management</h1>
        <NavLink className={styles.profile__exit}
          to='/home'
        >
          <img src={exitImg} alt="exit-img" />
          <h5>Exit the office</h5>
        </NavLink>
      </div>
      <div className={styles.profile__content}>
        <div className={styles.menu}>
          <button className={isMenuItemActive === 'info' ? `${styles.menu__item} ${styles.menu__item_active}` : styles.menu__item}
            onClick={() => toggleMenuItemActive('info')}
          >
            <img src={settingsImg} alt="info-img" />
            <span>Account info</span>
          </button>
          <button className={isMenuItemActive === 'subscriptions' ? `${styles.menu__item} ${styles.menu__item_active}` : styles.menu__item}
            onClick={() => toggleMenuItemActive('subscriptions')}
          >
            <img src={subscriptionsImg} alt="subscriptions-img" />
            <span>My Subscriptions</span>
          </button>
        </div>
        {chosenMenuItem()}
      </div>
      <Request />
    </section>
  );
}