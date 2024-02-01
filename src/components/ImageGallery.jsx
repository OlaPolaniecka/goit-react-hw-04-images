import css from './styles.module.css';

const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className={css.ImageGallery}>{children}</ul>
    </>
  );
};

export default ImageGallery;
