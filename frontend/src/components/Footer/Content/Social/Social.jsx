import whatsapp from '../../../../assets/icons/whatsapp.svg';
import telegram from '../../../../assets/icons/telegram.svg';

import styles from './Social.module.scss';

export default function Social() {
  return (
    <div className={styles.social}>
      <a className={styles.social__icon} href=""><img src={whatsapp} alt="whatsapp-icon" /></a>
      <a className={styles.social__icon} href=""><img src={telegram} alt="telegram-icon" /></a>
      <button className={styles.social__language}>EN</button>
    </div>
  )
}