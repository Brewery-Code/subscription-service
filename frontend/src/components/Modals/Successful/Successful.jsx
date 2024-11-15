import checkMarkImg from '../../../assets/icons/check-mark-green.svg';

import styles from './Successful.module.scss';

export default function Successful({ isSuccessfulActive }) {
  return (
    <div className={isSuccessfulActive ? `${styles.successful} ${styles.successful_active}` : styles.successful}>
      <div className={styles.successful__body}>
        <span>Successful</span>
        <img src={checkMarkImg} alt="check-mark-img" />
      </div>
    </div>
  );
}