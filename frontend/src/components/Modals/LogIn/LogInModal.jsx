import { createPortal } from 'react-dom';
import { useState } from 'react';

import appleImg from '../../../assets/icons/apple.svg';
import facebookImg from '../../../assets/icons/facebook.svg';
import googleImg from '../../../assets/icons/google.svg';
import CreateAccountModal from '../CreateAccount/CreateAccount';

import styles from './LogInModal.module.scss';

export default function LogInModal({ isOpen, toggleModal }) {
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);

  const toggleCreateAccountModal = () => {
    setCreateAccountOpen((prev) => !prev);
  }

  // Новий обробник подій для створення облікового запису
  const handleCreateAccount = () => {
    toggleCreateAccountModal(); // Відкриває CreateAccountModal
    toggleModal(); // Закриває LogInModal
  }

  return createPortal(
    <div className={`${styles.popup} ${isOpen ? styles.popup_active : ''}`}
      onClick={toggleModal}
    >
      <div className={styles.popup__body}>
        <div className={`${styles.popup__content} ${styles['subscription-application']}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.popup__crose} onClick={toggleModal}></button>
          <h2 className={styles.popup__title}>Log in</h2>
          <div className={styles['new-user']}>
            <h3 className={styles['new-user__title']}>New user?</h3>
            <button
              className={styles['new-user__create-account']}
              onClick={handleCreateAccount}
            >
              Create an account
            </button>
            <CreateAccountModal isOpen={isCreateAccountOpen} toggleModal={toggleCreateAccountModal} toggleLogIn={toggleModal} />
          </div>
          <form className={styles.form} action="">
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="email1">Email Address</label>
              <input className={styles.form__input} type="text" name='email1' id='email1' placeholder='Enter your e-mail' />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="password1">Password</label>
              <input className={styles.form__input} type="text" name='password1' id='password1' placeholder='*********' />
            </div>
          </form>
          <div className={styles.login}>
            <button className={styles.login__forgot}>Forgot password?</button>
            <button className={styles.login__login}>Log in</button>
          </div>
          <div className={styles.sign}>
            <div className={styles.sign__title}>
              <span></span>
              <h4>Or sign in with</h4>
              <span></span>
            </div>
            <button className={styles.sign__item}>
              <img className={styles.sign__img} src={googleImg} alt="account-icon" />
            </button>
            <button className={styles.sign__item}>
              <img className={styles.sign__img} src={facebookImg} alt="account-icon" />
            </button>
            <button className={styles.sign__item}>
              <img className={styles.sign__img} src={appleImg} alt="account-icon" />
            </button>
          </div>
          <div className={styles.privacy}>
            Protected by reCAPTCHA and subject to the Google <a href="https://fls.guru/grid.html">Privacy Policy</a> and <a href="">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>, document.getElementById('modals')
  );
}
