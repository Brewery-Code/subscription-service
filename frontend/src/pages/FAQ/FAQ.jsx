import { useEffect, useState } from 'react';
import axios from 'axios';

import Title from '../../components/UI/Title/Title';
import Accordion from '../../components/UI/Accordion/Accordion';
import Button from '../../components/UI/Button/Button';

import styles from './FAQ.module.scss';


export default function FAQ() {
  const [faqList, setFaqList] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/faq')
      .then(res => {
        const data = res.data;
        setFaqList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section className={styles.faq}>
      <Title>How can we help you?</Title>
      <div className={styles.faq__list}>
        <Accordion faqList={faqList} />
      </div>
      <div className={styles.faq__button}>
        <Button type={'support'}>Support</Button>
      </div>
    </section>
  )
}