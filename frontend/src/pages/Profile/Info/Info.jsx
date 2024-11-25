import { useEffect, useState } from 'react';
import IP from '../../../../IP.js';
import styles from './Info.module.scss';
import Successful from '../../../components/Modals/Successful/Successful.jsx';

export default function Info() {
  const [userData, setUserData] = useState({
    name: 'Name',
    surname: 'Surname',
    email: 'E-mail',
  });

  const [formData, setFormData] = useState({
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`http://${IP}:8000/api/user/profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Помилка при збереженні даних");
      } else {
        toggleSuccessfulActive();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`http://${IP}:8000/api/user/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert('Помилка при завантаженні даних');
          throw new Error("Помилка при завантаженні даних");
        }
        const result = await response.json();
        setUserData(result);
        setFormData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [isSuccessfulActive, setIsSuccessfulActive] = useState(false);
  const toggleSuccessfulActive = () => {
    setIsSuccessfulActive(prev => !prev)
    setTimeout(() => {
      setIsSuccessfulActive(false);
    }, 4000)
  }

  return (
    <>
      <div className={styles.info}>
        <h2 className={styles.info__title}>Account info</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__body}>
            <div className={styles.form__item}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.form__item}>
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Enter your surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.form__item}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">
            Save changes
          </button>
        </form>
      </div>
      <Successful isSuccessfulActive={isSuccessfulActive} />
    </>
  );
}
