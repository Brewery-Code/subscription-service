import styles from './Rights.module.scss';

export default function Rights() {
  return (
    <div className={styles['rights-list']}>
      <div className={styles['rights-list__item']}>Privacy Policy</div>
      <div className={styles['rights-list__item']}>Copyright 2021 © All Rights Reserved</div>
      <div className={styles['rights-list__item']}>Developed by ....</div>
    </div>
  )
}