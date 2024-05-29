import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onCLick }) {
  const base =
    "inline-block rounded-full bg-yellow-500  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 active:translate-y-1 disabled:cursor-not-allowed ";
  const style = {
    primary: base + " px-3 py-2 md:px-4 md:py-3 ",
    small: base + " px-3 py-2 md:px-3 md:py-3 text-xs ",
    round: base + "px-3 py-1 md:px-4 md:py-2 font-semibold text-md ",
    secondary:
      "inline-block rounded-full  text-stone-500 font-semibold uppercase tracking-wide  transition-colors duration-300 px-2 py-2  bg-stone-300 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2 active:translate-y-1 disabled:cursor-not-allowed md:px-4 md:py-3 hover:text-stone-700 ",
  };
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  if (onCLick) {
    return (
      <button className={style[type]} disabled={disabled} onClick={onCLick}>
        {children}
      </button>
    );
  }
  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
