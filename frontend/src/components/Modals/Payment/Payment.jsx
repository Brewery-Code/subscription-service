import { createPortal } from 'react-dom';

import appleImg from '../../../assets/icons/applePay.svg';
import googleImg from '../../../assets/icons/googlePay.svg';

import styles from './Payment.module.scss';

export default function PaymentModule({ isOpen, toggleModal }) {
  return createPortal(
    <div className={`${styles.popup} ${isOpen ? styles.popup_active : ''}`}
      onClick={toggleModal}
    >
      <div className={styles.popup__body}>
        <div className={`${styles.popup__content} ${styles['subscription-application']}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.popup__crose} onClick={toggleModal}></button>
          <h3 className={styles.popup__title}>Purchase payment</h3>
          <div className={styles.buttons}>
            <button className={styles.buttons__button}>
              <img src={appleImg} alt="apple-img" />
            </button>
            <button className={styles.buttons__button}>
              <img src={googleImg} alt="apple-img" />
            </button>
          </div>
          <form className={styles.form}>
            <div className={styles.form__data}>
              <div className={styles.form__item}>
                <label className={styles.form__title} htmlFor="">Card Number</label>
                <input className={styles.form__input}
                  type="text"
                  name='card'
                  id='card'
                  placeholder='1234 1234 1234 1234'
                  required
                />
              </div>
              <div className={styles.form__row}>
                <div className={styles.form__item}>
                  <label className={styles.form__title} htmlFor="">Expiration Date</label>
                  <input className={styles.form__input}
                    type="text"
                    name='date'
                    id='date'
                    placeholder='MM/ГГ'
                    required
                  />
                </div>
                <div className={styles.form__item}>
                  <label className={styles.form__title} htmlFor="">CVC</label>
                  <input className={styles.form__input}
                    type="text"
                    name='CVC'
                    id='CVC'
                    placeholder='CVC'
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <button className={styles.form__pay} type="submit">Pay with card</button>
              <p>We do not collect information on your cards, everything is safe</p></div>
          </form>
          <div className={styles.crypto}>
            <h4 className={styles.crypto__title}>Payment by crypto wallet</h4>
            <div className={styles.crypto__data}>
              <h5>Select currency</h5>
              <select name="currency" id="currency">
                <option value="red">Червоний</option>
                <option value="green">Зелений</option>
                <option value="blue">Синій</option>
                <option value="yellow">Жовтий</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>, document.getElementById('modals')
  )
}