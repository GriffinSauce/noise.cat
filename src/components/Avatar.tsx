import { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FiUser } from 'react-icons/fi';

type Props = {
  alt: string | null | undefined;
  src: string | null | undefined;
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
  if (loading)
    return (
      <div className="leading-none">
        <Skeleton circle width={sizeInt} height={sizeInt} />
      </div>
    ); // Attempt to create a skeleton that will stay in sync w. avatar options
  return (
    <>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="block rounded-full" alt={alt || ''} src={src} />
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
