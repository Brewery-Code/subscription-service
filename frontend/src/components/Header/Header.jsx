import Logo from "./Logo/Logo";
import Nav from "./Nav/Nav";

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="header__container">
        <div className={styles.header__body}>
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  )
}