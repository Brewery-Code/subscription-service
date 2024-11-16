import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Subscriptions.module.scss';
import IP from '../../../../IP.js';

export default function Subscriptions({ services, subscriptionPlan }) {
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`http://${IP}:8000/api/user/subscriptions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Помилка при завантаженні даних");
        }

        const result = await response.json();
        console.log("Subscriptions result:", result);

        const subscriptionIds = result.map(item => item.service);
        console.log("Subscription IDs:", subscriptionIds);

        const result1 = services.filter(item => subscriptionIds.includes(item.id));
        console.log("Filtered services:", result1);

        setSubscriptions(result1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className={styles.subscriptions}>
      {subscriptions?.map((item) => (
        <div key={item.id} className={styles.subscription}>
          <div className={styles.subscription__title}>{item.name}</div>
          <div className={styles.subscription__content}>
            <p className={styles.subscription__description}>{item.description}</p>
            <button className={styles.subscription__plan}>Change plan</button>
          </div>
        </div>
      ))}
    </div>
  )
};