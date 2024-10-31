import styles from './Info.module.scss';

export default function Info() {
  return (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Account info</h2>
      <form className={styles.form}
        onSubmit={''}
      >
        <div className={styles.form__body}>
          <div className={styles.form__item}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name='name'
              id='name'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="name">Surname</label>
            <input
              type="text"
              name='surname'
              id='surname'
              placeholder='Enter your surname'
              required
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="name">E-mail</label>
            <input
              type="text"
              name='email'
              id='email'
              placeholder='Enter yout e-mail'
              required
            />
          </div>
        </div>
        <button type='submit'>Save changes</button>
      </form>
    </div>
  );
}