import telegram from '../../../../../assets/icons/telegram.svg';
import whatsapp from '../../../../../assets/icons/whatsapp.svg';

import styles from './SocialMedia.module.scss';

export default function SocialMedia() {
  return (
    <div className={styles.buttons}>
      <a href="" className={styles.buttons__item}>
        <img width="20px" height="20px" src={whatsapp} alt=" whatsapp-icon" />
      </a>
      <a href="" className={styles.buttons__item}>
        <img width="20px" height="20px" src={telegram} alt="telegram-icon" />
      </a>
    </div>
  )
}