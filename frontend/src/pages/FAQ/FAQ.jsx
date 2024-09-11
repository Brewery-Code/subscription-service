import Title from '../../components/UI/Title/Title';
import Accordion from '../../components/UI/Accordion/Accordion';
import Button from '../../components/UI/Button/Button';

import styles from './FAQ.module.scss';


export default function FAQ({ faq }) {
  return (
    <section className={styles.faq}>
      <Title>How can we help you?</Title>
      <div className={styles.faq__list}>
        <Accordion faqList={faq} />
      </div>
      <div className={styles.faq__button}>
        <Button type={'support'}>Support</Button>
      </div>
    </section>
  )
}