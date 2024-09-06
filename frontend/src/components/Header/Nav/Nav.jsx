import Menu from './Menu/Menu';
import Buttons from './Buttons/Buttons';

import styles from './Nav.module.scss';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Menu />
      <Buttons />
    </nav>
  )
}