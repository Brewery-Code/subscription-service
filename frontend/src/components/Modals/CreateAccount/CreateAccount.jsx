import { createPortal } from 'react-dom';
import { useState } from 'react';

import appleImg from '../../../assets/icons/apple.svg';
import facebookImg from '../../../assets/icons/facebook.svg';
import googleImg from '../../../assets/icons/google.svg';

import styles from './CreateAccount.module.scss';

export default function CreateAccountModal({ isOpen, toggleModal, toggleLogIn, toggleUserLogin }) {
  const toggleSignIn = () => {
    toggleModal();
    toggleLogIn();
  }

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);
  }

  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      toggleModal();
      toggleUserLogin();
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
          <button className={styles.popup__crose} onClick={toggleModal}></button>
          <h2 className={styles.popup__title}>Create an account</h2>
          <div className={styles['new-user']}>
            <h3 className={styles['new-user__title']}>Already have an account? </h3>
            <button
              className={styles['new-user__create-account']}
              onClick={toggleSignIn}
            >
              Sign in
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="name">User name</label>
              <input className={styles.form__input} type="text" name='name' id='name' placeholder='Enter your name' value={formData.name} required onChange={handleChange} />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="email">Email Address</label>
              <input className={styles.form__input} type="text" name='email' id='email' placeholder='Enter your e-mail' value={formData.email} required onChange={handleChange} />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="password">Password</label>
              <input className={styles.form__input} type="password" name='password' id='password' placeholder='*********' value={formData.password} required onChange={handleChange} />
            </div>
            <div className={styles.privacy}>
              <div className={styles.privacy}>
                <label className={`${styles['privacy__custom-checkbox']} ${isChecked ? styles['privacy__custom-checkbox_active'] : ''}`} htmlFor="privacy-checkbox"></label>
                <input className={styles.privacy__checkbox} type="checkbox" id="privacy-checkbox" onChange={handleCheckboxChange} required />
                <label className={styles.privacy__text}> By creating an account you agree to our <a href="" className={styles.privacy}>Privacy Policy </a> and <a href="">Terms of Service.</a></label>
              </div>
            </div>
            <button className={styles.login__login} type="submit">Sign up</button>
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
          </form>
        </div>
      </div>
    </div>, document.getElementById('modals')
  );
}
