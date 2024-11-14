import { useEffect, useState } from 'react';
import styles from './Info.module.scss';

export default function Info() {
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData(formData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch("http://127.0.0.1:8000/api/users/", {
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
        setUserData(result);
        console.log(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Account info</h2>
      <form className={styles.form}
        onSubmit={''}
      >
        <div className={styles.form__body}>
          <div className={styles.form__item}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name='name'
              id='name'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="name">Surname</label>
            <input
              type="text"
              name='surname'
              id='surname'
              placeholder='Enter your surname'
              required
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="name">E-mail</label>
            <input
              type="text"
              name='email'
              id='email'
              placeholder='Enter yout e-mail'
              required
            />
          </div>
        </div>
        <button type='submit'>Save changes</button>
      </form>
    </div>
  );
}