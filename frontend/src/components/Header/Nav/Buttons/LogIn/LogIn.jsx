import { useState, useEffect } from 'react';
import LogInModal from '../../../../Modals/LogIn/LogInModal';
import { NavLink } from 'react-router-dom';

import userImg from '../../../../../assets/icons/user-icon.svg';
import arrowImg from '../../../../../assets/icons/arrow-slim.svg';
import logoutImg from '../../../../../assets/icons/logout.svg';

import styles from './LogIn.module.scss';

export default function LogIn() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLogin, setUserLogin] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isDropdownMenuOpen, setDropdowmMenuOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const toggleUserLogin = () => {
    setUserLogin((prev) => !prev);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  const toggleDropdownMenu = () => {
    setDropdowmMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setUserLogin(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    toggleUserLogin();
    toggleDropdownMenu();
  };

  return (
    <div className={isUserLogin ? styles.row : ''}>
      {isUserLogin ?
        <div className={styles['user-img']}>
          <img
            src={userImg}
            alt="user-image"
          />
        </div> : ''}
      <button
        className={isUserLogin ? styles.profile : styles['log-in']}
        onClick={isUserLogin ? toggleProfile : toggleModal}
        onMouseEnter={toggleDropdownMenu}
        onMouseLeave={toggleDropdownMenu}
      >
        {isUserLogin ? 'Profile' : 'Log in'}
        {isUserLogin ?
          <img
            src={arrowImg}
            alt="arrow-img"
            className={[styles.arrow, isDropdownMenuOpen ? styles.arrow_active : ''].join(' ')}
          /> : ''}
      </button>
      {isUserLogin ?
        <div
          className={[styles.menu, isDropdownMenuOpen ? styles.menu_active : ''].join(' ')}
          onMouseEnter={toggleDropdownMenu}
          onMouseLeave={toggleDropdownMenu}
        >
          <button className={styles.menu__item}>
            <div>
              <img
                src={userImg}
                alt="user-img"
              />
            </div>
            <span>
              <NavLink to={'/profile'}>My profile</NavLink>
            </span>
          </button>
          <button
            className={styles.menu__item}
            onClick={logout}
          >
            <div>
              <img
                src={logoutImg}
                alt="logout"
              />
            </div>
            <span>Logout</span>
          </button>
        </div> : ''}
      <LogInModal isOpen={isModalOpen} toggleModal={toggleModal} toggleUserLogin={toggleUserLogin} />

    </div>
  );
}
