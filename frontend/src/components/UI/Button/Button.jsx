import style from './Button.module.scss';

export default function Button({ type, children }) {
  return (
    <button className={`${style.button} ${style[`button_${type}`]}`}>
      {children}
    </button>
  );
}