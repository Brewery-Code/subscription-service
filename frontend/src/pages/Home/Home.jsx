import Startup from './Startup/Startup';
import Subscriptions from './Subscriptions/Subscriptions';
import Steps from './Steps/Steps';
import Invite from './Invite/Invite';
import AboutUs from './AboutUs/AboutUs';
import FAQ from './FAQ/FAQ';
import Request from './Request/Request';

import styles from './Home.module.scss';


export default function Home({ state }) {
  return (
    <>
      <Startup />
      <Subscriptions services={state.services} />
      <Steps />
      <Invite />
      <AboutUs />
      <FAQ faq={state.faq} />
      <Request />
    </>
  )
}