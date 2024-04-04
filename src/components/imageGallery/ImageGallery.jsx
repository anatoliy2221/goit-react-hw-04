import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map(
        ({ id, urls, alt_description, description, color, likes, user }) => (
          <ImageCard
            key={id}
            alt={alt_description}
            urls={urls}
            color={color}
            likes={likes}
            user={user}
            description={description}
            openModal={openModal}
          />
        )
      )}
    </ul>
  );
};

export default ImageGallery;
