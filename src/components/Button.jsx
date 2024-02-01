import css from './styles.module.css';

const Button = ({ nextPage, label, type }) => {
  return (
    <button className={css.LoadMore} type={type} onClick={nextPage}>
      {label}
    </button>
  );
};

export default Button;
