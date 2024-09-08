import SocialMedia from './SocialMedia/SocialMedia';
import Language from './Language/Language';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';

import styles from './Buttons.module.scss';

export default function Menu() {
  return (
    <div className={styles.buttons}>
      <SocialMedia />
      <Language />
      <LogIn />
      <SignUp />
    </div>
  )
}