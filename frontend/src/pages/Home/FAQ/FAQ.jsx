import { useState, useEffect } from 'react';
import axios from 'axios';

import Accordion from '../../../components/UI/Accordion/Accordion';
import Title from '../../../components/UI/Title/Title';

import styles from './FAQ.module.scss';

export default function FAQ() {

  const [faqList, setFaqList] = useState(null); // Створюємо стан для збереження даних з API

  useEffect(() => {
    axios.get('http://localhost:8000/api/faq')
      .then(res => {
        const data = res.data;
        setFaqList(data); // Оновлюємо стан, коли отримали дані
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.faq}>
      <Title >FAQ</Title>
      <div className={styles.content}>
        <Accordion faqList={faqList} />
      </div>
    </section>
  )
}