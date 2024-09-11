import Accordion from '../../../components/UI/Accordion/Accordion';
import Title from '../../../components/UI/Title/Title';
import Button from '../../../components/UI/Button/Button';

import styles from './FAQ.module.scss';

export default function FAQ({ faq }) {
  return (
    <section className={styles.faq}>
      <Title >FAQ</Title>
      <div className={styles.content}>
        <Accordion faqList={faq} />
      </div>
      <div className={styles.button}>
        <Button type={'support'}>Support</Button>
      </div>
    </section>
  )
}