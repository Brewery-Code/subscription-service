import { useState } from "react";

import Logo from "./Logo/Logo";
import Nav from "./Nav/Nav";
import BurgerButton from "./BurgerButton/BurgerButton";

import styles from './Header.module.scss';

export default function Header({ state }) {
  const [menuStatus, setMenuStatus] = useState(false);

  const toggleMenuStatus = () => {
    setMenuStatus(prev => !prev);
  }

  return (
    <header className={styles.header}>
      <div className="header__container">
        <div className={styles.header__body}>
          <Logo />
          <Nav state={state} menuStatus={menuStatus} />
          <BurgerButton toggleMenuStatus={toggleMenuStatus} menuStatus={menuStatus} />
        </div>
      </div>
    </header>
  )
}