import styles from './Invite.module.scss';

export default function Invite() {
  function setInviteLink() {
    navigator.clipboard.writeText('http://localhost:5173')
      .catch((err) => {
        console.error('Не вдалося скопіювати посилання: ', err);
      });
  }


  return (
    <section className={styles.invite}>
      <h2 className={styles.invite__title}>Invite friends</h2>
      <p className={styles.invite__text}>Starting today up to 50% for NETFLIX, YOUTUBE, SPOTIFY subscriptions with a secure payment from PAYPAL</p>
      <div className={`${styles.invite__row} ${styles.row}`}>
        <h3 className={styles.row__title}>Click on the link</h3>
        <button className={styles.row__link} onClick={setInviteLink}>Discounts On Services</button>
      </div>
    </section>
  )
}