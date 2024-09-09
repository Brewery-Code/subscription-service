import { useState, useRef } from 'react';

import styles from './Accordion.module.scss';

export default function Accordion({ faqList }) {
  const [openID, setID] = useState(null);
  const itemRef = useRef(null);

  const clickHandler = (id) => {
    if (id === openID) setID(null);
    else setID(id);
  }

  return (
    <ul className={styles.list}>
      {faqList?.map((item, id) => {
        return (
          <li className={styles.accordion} key={id}>
            <button
              className={`${styles.accordion__button} ${id === openID ? styles.accordion__button_active : ''}`}
              onClick={() => clickHandler(id)}
            >
              <h3>{item.question}</h3>
            </button>
            <div className={styles.accordion__body}>
              <p className={`${styles.accordion__content}`}
                style={id === openID ? { height: itemRef.current.scrollHeight + 20 } : { height: '0px' }}
                ref={itemRef}
              >
                {item.answer}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
