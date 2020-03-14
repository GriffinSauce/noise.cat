import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Skeleton from 'react-loading-skeleton';
import { FiMapPin, FiAlignLeft } from 'react-icons/fi';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const ShowsSkeleton = () =>
  [...Array(5)].map((v, index) => (
    <li key={index} className="pb-6">
      <h2 className="text-lg">
        <Skeleton width={250} />
      </h2>
      <h3 className="text-sm">
        <Skeleton width={100} />
      </h3>
      <div className="pt-1">
        <Skeleton width={150} />
      </div>
      <div className="pt-1">
        <Skeleton width={130} />
      </div>
    </li>
  ));

const Shows = () => {
  const {
    query: { band: slug },
  } = useRouter();
  const { data, error } = useSWR(
    slug ? `/api/bands/${slug}/shows` : null,
    fetcher,
  );

  if (error) return null;
  console.log('TCL: Shows -> error', error);
  const shows = data?.shows;
  return (
    <>
      <div>
        <ul>
          {shows ? (
            shows.map((show, index) => (
              <li key={show.title} className="pb-6">
                <h2 className="text-lg truncate">{show.title}</h2>
                <h3 className="flex items-center text-sm font-medium text-green-500">
                  <div className="mr-1 text-lg icon-fix">
                    <IoIosCheckmarkCircle />
                  </div>
                  <span>{show.date.replace(/-/g, ' ')}</span>
                </h3>
                <div className="flex items-center pt-1  min-w-0 text-gray-500">
                  <FiMapPin className="mr-1" />
                  <div className="truncate">{show.location}</div>
                </div>
                <div className="flex items-center pt-1 italic text-gray-500">
                  <FiAlignLeft className="mr-1" />
                  <div>{show.note || 'Notes'}</div>
                </div>
              </li>
            ))
          ) : (
            <ShowsSkeleton />
          )}
        </ul>
      </div>
      <style jsx>{`
        .icon-fix {
          transform: translate(-1px, -1px);
        }
      `}</style>
    </>
  );
};

export default Shows;
