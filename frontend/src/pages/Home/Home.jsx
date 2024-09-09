import Startup from './Startup/Startup';
import Subscriptions from './Subscriptions/Subscriptions';
import Steps from './Steps/Steps';
import Invite from './Invite/Invite';
import AboutUs from './AboutUs/AboutUs';
import FAQ from './FAQ/FAQ';
import Request from './Request/Request';

import styles from './Home.module.scss';


export default function Home() {
  return (
    <>
      <Startup />
      <Subscriptions />
      <Steps />
      <Invite />
      <AboutUs />
      <FAQ />
      <Request />
    </>
  )
}