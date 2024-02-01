import css from './styles.module.css';

const Modal = ({ imageURL, description }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={imageURL} alt={description} />
      </div>
    </div>
  );
};

export default Modal;
