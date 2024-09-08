import Logo from './Logo/Logo';
import Subscriptions from './Subscriptions/Subscriptions';
import Navigation from './Navigation/Navigation';
import Social from './Social/Social';

import styles from './Content.module.scss';

export default function Content() {
  return (
    <div className={styles.content}>
      <Logo />
      <Subscriptions />
      <Navigation />
      <Social />
    </div>
  )
}