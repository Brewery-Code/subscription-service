import style from './Button.module.scss';

export default function Button({ type, children }) {
  return (
    <div className={`${style.button} ${style[`button_${type}`]}`}>
      {children}
    </div>
  );
}