import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Request from '../Home/Request/Request';

import exitImg from '../../assets/icons/exit.svg';
import settingsImg from '../../assets/icons/settings.svg';
import subscriptionsImg from '../../assets/icons/subscriptions.svg';

import styles from './Profile.module.scss';

export default function Profile() {
  const [isMenuItemActive, setMenuItemActive] = useState('info');
  const toggleMenuItemActive = (item) => {
    setMenuItemActive(item);
  };

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
        <div className={styles.info}>
          <h2 className={styles.info__title}>Account info</h2>
          <form className={styles.form}
            onSubmit={''}
          >
            <div className={styles.form__body}>
              <div className={styles.form__item}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name='name'
                  id='name'
                  placeholder='Enter your name'
                  required
                />
              </div>
              <div className={styles.form__item}>
                <label htmlFor="name">Surname</label>
                <input
                  type="text"
                  name='surname'
                  id='surname'
                  placeholder='Enter your surname'
                  required
                />
              </div>
              <div className={styles.form__item}>
                <label htmlFor="name">E-mail</label>
                <input
                  type="text"
                  name='email'
                  id='email'
                  placeholder='Enter yout e-mail'
                  required
                />
              </div>
            </div>
            <button type='submit'>Save changes</button>
          </form>
        </div>
      </div>
      <Request />
    </section>
  );
};