import { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FiUser } from 'react-icons/fi';

type Props = {
  alt?: string;
  src?: string;
  size?: string;
  loading?: boolean;
};

const Avatar: FunctionComponent<Props> = ({
  alt,
  src,
  size = '30px',
  loading,
}) => {
  const sizeInt = parseInt(size, 10); // Assumes px
  if (loading) return <Skeleton circle width={sizeInt} height={sizeInt} />; // Attempt to create a skeleton that will stay in sync w. avatar options
  return (
    <>
      {src ? (
        <img className="block rounded-full" alt={alt} src={src} />
      ) : (
        <figure
          className="flex bg-gray-200 rounded-full flex-center"
          style={{ fontSize: `${sizeInt / 2}px` }}
        >
          <FiUser />
        </figure>
      )}
      <style jsx>
        {`
          img,
          figure {
            height: ${size};
            width: ${size};
          }
        `}
      </style>
    </>
  );
};

export default Avatar;
