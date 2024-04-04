import css from "./ImageCard.module.css";

const ImageCard = ({
  urls,
  alt,
  description,
  likes,
  color,
  user,
  openModal,
}) => {
  return (
    <div
      className={css.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img
        src={urls.small}
        alt={alt}
        onClick={() =>
          openModal(
            urls.regular,
            description,
            likes,
            color,
            user.name,
            user.location
          )
        }
      />
    </div>
  );
};

export default ImageCard;
