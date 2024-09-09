import Button from '../../../components/UI/Button/Button';
import styles from './Request.module.scss';

export default function Request() {
  return (
    <section className={styles.request}>
      <h3 className={styles.request__title}>Request for an additional subscription that was not found here</h3>
      <p className={styles.request__content}>Disney, Amazon Prime, Microsoft Office, Microsoft Windows</p>
      <div className={styles.request__button}>
        <Button type={'request'}>Request</Button>
      </div>
    </section>
  )
}