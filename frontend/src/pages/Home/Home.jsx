import Startup from './Startup/Startup';
import Steps from './Steps/Steps';
import Invite from './Invite/Invite';
import AboutUs from './AboutUs/AboutUs';

import styles from './Home.module.scss';


export default function Home() {
  return (
    <>
      <Startup />
      <Steps />
      <Invite />
      <AboutUs />
    </>
  )
}