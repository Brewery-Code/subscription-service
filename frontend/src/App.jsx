import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import IP from '../IP';

export default function App() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    axios.get(`http://${IP}:8000/api/services`)
      .then(res => {
        const data = res.data;
        setServices(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [faqList, setFaqList] = useState(null);

  useEffect(() => {
    axios.get(`http://${IP}:8000/api/faq`)
      .then(res => {
        const data = res.data;
        setFaqList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [subscriptionsPlans, setSubscriptionsPlans] = useState(null);

  useEffect(() => {
    axios.get(`http://${IP}:8000/api/subscription-plans`)
      .then(res => {
        const data = res.data;
        setSubscriptionsPlans(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [subscription, setSubscription] = useState(0);
  const [subscriptionPlan, setSubscriptionPlan] = useState(0);

  const selectSubscription = (id) => {
    setSubscription(services.find(item => item.id === id));
    setSubscriptionPlan(subscriptionsPlans.filter(item => item.service === id));
    console.log(subscription);
    console.log(subscriptionPlan);
  }


  let state = {
    services: services,
    faq: faqList,
    subscription: subscription,
    subscriptionPlan: subscriptionPlan,
    selectSubscription: selectSubscription,
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header state={state} />
        <Main state={state} />
        <Footer state={state} />
      </div>
    </BrowserRouter>
  );
}

