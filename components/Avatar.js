const Avatar = ({ alt, src, size = '30px' }) => {
  return (
    <>
      <img className="block rounded-full" alt={alt} src={src} />
      <style jsx>{`
        img {
          height: ${size};
          width: ${size};
        }
      `}</style>
    </>
  );
};

export default Avatar;
