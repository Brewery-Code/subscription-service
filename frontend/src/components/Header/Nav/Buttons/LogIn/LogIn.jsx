import { useState } from 'react';

import LogInModal from '../../../../Modals/LogIn/LogInModal';

import styles from './LogIn.module.scss';

export default function LogIn() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => (!prev));
  }

  return (
    <>
      <button className={styles['log-in']} onClick={toggleModal}>Log in</button>
      <LogInModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </>
  )
}