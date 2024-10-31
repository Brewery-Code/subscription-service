import styles from './Subscriptions.module.scss';

export default function Subscriptions() {
  return (
    <div className={styles.subscriptions}>
      <div className={styles.subscription}>
        <div className={styles.subscription__title}>Name</div>
        <div className={styles.subscription__content}>
          <p className={styles.subscription__description}>Smth about subscription.</p>
          <button className={styles.subscription__plan}>Change plan</button>
        </div>
      </div>
    </div>
  );
};