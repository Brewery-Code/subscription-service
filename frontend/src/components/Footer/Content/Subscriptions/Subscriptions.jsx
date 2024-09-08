import styles from './Subscriptions.module.scss';

export default function Subscriptions() {
  return (
    <div className={styles['subscriptions-list']}>
      <h4 className={styles['subscriptions-list__title']}>Subscriptions</h4>
      <a className={styles['subscriptions-list__item']} href="">Netflix</a>
      <a className={styles['subscriptions-list__item']} href="">YouTube Premium</a>
      <a className={styles['subscriptions-list__item']} href="">Spotify</a>
    </div>
  )
}