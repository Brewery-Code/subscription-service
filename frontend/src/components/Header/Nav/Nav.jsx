import Menu from './Menu/Menu';
import Buttons from './Buttons/Buttons';

import styles from './Nav.module.scss';

export default function Nav({ menuStatus }) {
  return (
    <nav className={`${styles.nav} ${menuStatus ? styles.nav_active : ''}`}>
      <Menu />
      <Buttons />
    </nav>
  )
}