import Link from 'next/link';
import Avatar from '../components/Avatar';
import { FiChevronRight } from 'react-icons/fi';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const BandHeader = ({ slug }) => {
  const { data: bandData, error: bandError } = useSWR(
    slug ? `/api/bands/${slug}` : null,
    fetcher,
  );
  if (bandError) return 'Error';
  return (
    <>
      <h2 className="h2">{bandData ? bandData.band.name : '-'}</h2>
      <style jsx>{`
        .h2 {
          margin: 0;
          width: 100%;
          padding-top: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default BandHeader;
