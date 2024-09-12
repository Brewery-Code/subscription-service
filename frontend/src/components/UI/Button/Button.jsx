import style from './Button.module.scss';

export default function Button({ type, children, ...rest }) {
  return (
    <button className={`${style.button} ${style[`button_${type}`]}`}
      {...rest}
    >
      {children}
    </button>
  );
}