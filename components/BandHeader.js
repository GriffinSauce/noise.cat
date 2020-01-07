import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const BandHeader = ({ slug }) => {
  const { data, error } = useSWR(slug ? `/api/bands/${slug}` : null, fetcher);
  if (error) return 'Error';
  if (!data) return '';

  const {
    band: { name },
  } = data;
  return (
    <>
      <h1>{name}</h1>

      <style jsx>{`
        h1 {
          margin: 0;
          width: 100%;
          padding-top: 10px;
          line-height: 1.15;
          font-size: 20px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default BandHeader;
