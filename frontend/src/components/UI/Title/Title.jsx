import styles from './Title.module.scss';

export default function Title({ children }) {
  return (
    <h2 className={styles.title}>{children}</h2>
  )
}