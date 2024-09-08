import Content from './Content/Content';
import Rights from './Rights/Rights';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="footer__container">
        <div className={styles.footer__body}>
          <Content />
          <Rights />
        </div>
      </div>
    </footer>
  )
}