import { FiUser } from 'react-icons/fi';

const Avatar = ({ alt, src, size = '30px' }) => {
  return (
    <>
      {src ? (
        <img className="block rounded-full" alt={alt} src={src} />
      ) : (
        <figure
          className="rounded-full bg-gray-200 flex flex-center"
          style={{ fontSize: `${parseInt(size, 10) / 2}px` }}
        >
          <FiUser />
        </figure>
      )}
      <style jsx>{`
        img,
        figure {
          height: ${size};
          width: ${size};
        }
      `}</style>
    </>
  );
};

export default Avatar;
