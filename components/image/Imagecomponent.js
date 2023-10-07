export const ImageComponent = ({ imageUrl, rounded, maxHeight, maxWidth }) => {

  return (
    <img
      src={imageUrl}
      alt="Image"
      className={`    w-fulll h-full      object-cove ${rounded} `}
      style={{ maxHeight: maxHeight, maxWidth: maxWidth }}
    />
  );
};
