import { useState, useEffect } from 'react';
import css from './styles.module.css';

const ImageGalleryItem = ({ onClick, src, description }) => {
  const [imageLoader, setImageLoader] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoader(true);
    };
    img.src = src;
  }, [src]);

  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(src)}>
      {imageLoader}
      <img
        className={css.ImageGalleryItem_image}
        loading="lazy"
        src={src}
        alt={description}
      />
    </li>
  );
};

export default ImageGalleryItem;
