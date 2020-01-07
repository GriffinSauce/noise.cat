import Link from 'next/link';
import Avatar from '../components/Avatar';
import { FiChevronRight } from 'react-icons/fi';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const BandHeader = ({ slug }) => {
  // Get me
  const { data: user, error: meError } = useSWR(`/api/me`, fetcher);
  const { data: bandData, error: bandError } = useSWR(
    slug ? `/api/bands/${slug}` : null,
    fetcher,
  );

  if (meError || bandError) return 'Error';

  if (!bandData || !user) return '';

  const { band } = bandData;
  return (
    <>
      <h2 className="header">
        <Link href="/profile">
          <a>
            <Avatar alt={user.name} src={user.picture} size="20px" />
            <span className="username">{user.name}</span>
          </a>
        </Link>
        <FiChevronRight />
        {band.name}
      </h2>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          width: 100%;
          padding-top: 10px;
          line-height: 1.15;
          text-align: center;
          color: #000;
        }
        a {
          display: flex;
          align-items: center;
          color: #000;
          text-decoration: none;
        }
        a .username {
          margin-left: 8px;
        }
      `}</style>
    </>
  );
};

export default BandHeader;
