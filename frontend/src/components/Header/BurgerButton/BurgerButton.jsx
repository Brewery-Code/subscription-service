import styles from './BurgerButton.module.scss';

export default function BurgerButton({ toggleMenuStatus, menuStatus }) {
  return (
    <button className={`${styles['burger-button']} ${menuStatus ? styles['burger-button_active'] : ''}`} onClick={toggleMenuStatus}>
      <span></span>
    </button>
  )
}