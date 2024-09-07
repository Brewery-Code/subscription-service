import styles from './MenuItem.module.scss';

export default function MenuItem({ text, img, link, alt, burger }) {
  const liClass = burger
    ? `${styles.menu__item} ${styles.menu__item_burger}`
    : `${styles.menu__item}`;

  return (
    <li className={liClass}>
      <img className={styles['menu__item_burger-icon']} src={img} alt={alt} />
      <a href={link}>{text}</a>
    </li>
  )
}