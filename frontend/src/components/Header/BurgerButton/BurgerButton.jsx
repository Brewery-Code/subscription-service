import styles from './BurgerButton.module.scss';

export default function BurgerButton({ toggleMenuStatus }) {
  return (
    <button className={styles['burger-button']} onClick={toggleMenuStatus}>
      <span></span>
    </button>
  )
}