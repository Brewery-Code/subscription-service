import { useState, useEffect } from 'react';
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

  const [isMobileDropdownMenuOpen, setMobileDropdowmMenuOpen] = useState(false);
  const toggleMobileDropdownMenuOpen = () => {
    if (windowWidth < 645) {
      setMobileDropdowmMenuOpen(prev => !prev);
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      handleWidthChange(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleWidthChange = (width) => {
    if (width >= 650) {
      setMobileDropdowmMenuOpen(false);
    }
  };

  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

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
        <div className={!isMobileDropdownMenuOpen ? styles.menu : `${styles.menu} ${styles.menu_active}`}
          onClick={toggleMobileDropdownMenuOpen}
          style={
            isMobileDropdownMenuOpen ? {
              height: '108px',

            } : {}
          }
        >
          <button className={isMenuItemActive === 'info' ? `${styles.menu__item} ${styles.menu__item_active}` : styles.menu__item}
            onClick={() => toggleMenuItemActive('info')}
            style={
              isMobileDropdownMenuOpen ? {
                visibility: 'inherit',
                opacity: '1',
              } : {}
            }
          >
            <img src={settingsImg} alt="info-img" />
            <span>Account info</span>
          </button>
          <button className={isMenuItemActive === 'subscriptions' ? `${styles.menu__item} ${styles.menu__item_active}` : styles.menu__item}
            onClick={() => toggleMenuItemActive('subscriptions')}
            style={
              isMobileDropdownMenuOpen ? {
                visibility: 'inherit',
                opacity: '1',
              } : {}
            }
          >
            <img src={subscriptionsImg} alt="subscriptions-img" />
            <span>My Subscriptions</span>
          </button>
        </div>
        {chosenMenuItem()}
      </div>
      <NavLink className={`${styles.profile__exit_mobile}`}
        to='/home'
      >
        <img src={exitImg} alt="exit-img" />
        <h5>Exit the office</h5>
      </NavLink>
      <Request />
    </section>
  );
}