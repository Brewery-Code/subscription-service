import { NavLink } from 'react-router-dom'
import styles from './Subscription.module.scss'

export default function Subscription({ children, ...props }) {
  return (
    <li {...props} className={styles[`subscription__menu-item`]}>{children}</li>
  )
}