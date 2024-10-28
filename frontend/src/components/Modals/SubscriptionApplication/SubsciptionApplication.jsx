import { createPortal } from 'react-dom';

import Button from '../../UI/Button/Button';
import styles from './SubscriptionApplication.module.scss';

export default function SubscriptionApplication({ isOpen, toggleModal }) {
  return createPortal(
    <div className={`${styles.popup} ${isOpen ? styles.popup_active : ''}`}
      onClick={toggleModal}
    >
      <div className={styles.popup__body}>
        <div className={`${styles.popup__content} ${styles['subscription-application']}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.popup__crose} onClick={toggleModal}></button>
          <h3 className={styles['subscription-application__title']}>Subscription Application</h3>
          <form className={styles.form} action="">
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="name2">Enter your name</label>
              <input className={styles.form__input} type="text" name="name2" id="name2" placeholder="Anastasiia" />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="email2">E-mail</label>
              <input className={styles.form__input} type="text" name="email2" id="email2" placeholder="Enter your e-mail" />
            </div>
            <div className={styles.form__item}>
              <label className={styles.form__title} htmlFor="phone2">Phone</label>
              <input className={styles.form__input} type="number" name="phone2" id="number2" placeholder="Enter your phone" />
            </div>
            <div className={styles.form__item}>
              <Button type='modal-apply'>Apply</Button>
            </div>
          </form>
        </div>
      </div>
    </div>, document.getElementById('modals')
  );
}
