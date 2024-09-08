import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <div className={styles['navigation-list']}>
      <h4 className={styles['navigation-list__title']}>Site navigation</h4>
      <a className={styles['navigation-list__item']} href="">About</a>
      <a className={styles['navigation-list__faq']} href="">FAQ</a>
      <a className={styles['navigation-list__item']} href="">Support</a>
    </div>
  )
}