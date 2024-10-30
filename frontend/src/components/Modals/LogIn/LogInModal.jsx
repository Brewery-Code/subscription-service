import { createPortal } from 'react-dom';
import { useState } from 'react';

import appleImg from '../../../assets/icons/apple.svg';
import facebookImg from '../../../assets/icons/facebook.svg';
import googleImg from '../../../assets/icons/google.svg';
import CreateAccountModal from '../CreateAccount/CreateAccount';

import styles from './LogInModal.module.scss';

export default function LogInModal({ isOpen, toggleModal, toggleUserLogin }) {
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);

  const toggleCreateAccountModal = () => {
    setCreateAccountOpen((prev) => !prev);
  }

  const handleCreateAccount = () => {
    toggleCreateAccountModal();
    toggleModal();
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${jwt_token}',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      } else {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        toggleUserLogin();
      }

      console.log('Success:', data.token);
      toggleModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return createPortal(
    <div className={`${styles.popup} ${isOpen ? styles.popup_active : ''}`}
      onClick={toggleModal}
    >
      <div className={styles.popup__body}>
        <div className={`${styles.popup__content} ${styles['subscription-application']}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.popup__close} onClick={toggleModal}></button>
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="email">Email Address</label>
              <input className={styles.form__input} type="text" name='email' id='email1' placeholder='Enter your e-mail' value={formData.email} required onChange={handleChange} />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="password">Password</label>
              <input className={styles.form__input} type="password" name="password" id="password1" placeholder="*********" value={formData.password} required onChange={handleChange} />
            </div>
            <div className={styles.login}>
              <button className={styles.login__forgot}>Forgot password?</button>
              <button type="submit" className={styles.login__login}>Log in</button>
            </div>
          </form>
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
