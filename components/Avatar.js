const Avatar = ({ alt, src, size = '30px' }) => {
  return (
    <>
      <img alt={alt} src={src}></img>
      <style jsx>{`
        img {
          display: block;
          height: ${size};
          width: ${size};
          border-radius: ${size};
        }
      `}</style>
    </>
  );
};

export default Avatar;
