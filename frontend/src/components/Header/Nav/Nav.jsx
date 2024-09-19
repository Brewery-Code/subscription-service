import Menu from './Menu/Menu';
import Buttons from './Buttons/Buttons';

import styles from './Nav.module.scss';

export default function Nav({ state, menuStatus }) {
  // state.selectSubscription(19);

  return (
    <nav className={`${styles.nav} ${menuStatus ? styles.nav_active : ''}`}>
      <Menu services={state.services} selectSubscription={state.selectSubscription} />
      <Buttons />
    </nav>
  )
}