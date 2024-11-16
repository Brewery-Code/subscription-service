import { createPortal } from 'react-dom';
import IP from '../../../../IP.js';
import appleImg from '../../../assets/icons/applePay.svg';
import googleImg from '../../../assets/icons/googlePay.svg';

import styles from './Payment.module.scss';
import { useState } from 'react';

export default function PaymentModule({ isOpen, toggleModal, subscription, subscriptionPlan }) {
  const [isCurrencyActive, setCurrencyActive] = useState('Bitcoin');
  const toggleCurrency = (currency) => {
    setCurrencyActive(currency);
  }

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((isMenuOpen) => (!isMenuOpen));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`http://${IP}:8000/api/user/purchase_subscription/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          "plan_id": subscriptionPlan.id,
          "service_id": subscription.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Помилка при збереженні даних");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
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
          <h3 className={styles.popup__title}>Purchase payment</h3>
          <div className={styles.buttons}>
            <button className={styles.buttons__button}>
              <img src={appleImg} alt="apple-img" />
            </button>
            <button className={styles.buttons__button}>
              <img src={googleImg} alt="apple-img" />
            </button>
          </div>
          <form className={styles.form}
            onSubmit={handleSubmit}
          >
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
              <div className={styles.list}>
                <div className={!isMenuOpen ? styles.list__active : `${styles.list__active} ${styles.list__active_active}`}
                  onClick={toggleMenu}
                >
                  {isCurrencyActive}
                </div>
                <div className={styles.list__dropdown}
                  style={{
                    visibility: isMenuOpen ? 'inherit' : '',
                    opacity: isMenuOpen ? '1' : '',
                    maxHeight: isMenuOpen ? '100px' : ''
                  }}
                >
                  <div className={styles.list__item}
                    onClick={() => toggleCurrency('Bitcoin')}
                    style={{
                      display: isCurrencyActive === 'Bitcoin' ? 'none' : ''
                    }}
                  >
                    Bitcoin
                  </div>
                  <div className={styles.list__item}
                    onClick={() => toggleCurrency('Ethereum')}
                    style={{
                      display: isCurrencyActive === 'Ethereum' ? 'none' : ''
                    }}
                  >
                    Ethereum
                  </div>
                  <div className={styles.list__item}
                    onClick={() => toggleCurrency('USDT')}
                    style={{
                      display: isCurrencyActive === 'USDT' ? 'none' : ''
                    }}
                  >
                    USDT
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.crypto__pay}>Pay</button>
          </div>
        </div>
      </div>
    </div>, document.getElementById('modals')
  )
}