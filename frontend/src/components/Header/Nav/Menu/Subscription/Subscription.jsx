import styles from './Subscription.module.scss'

export default function Subscription({ children }) {
  return (
    <li className={styles[`subscription__menu-item`]}>{children}</li>
  )
}