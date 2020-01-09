import Link from 'next/link';
import Avatar from '../components/Avatar';
import useAuthentication from '../utils/useAuthentication';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const Footer = () => {
  const { isAuthenticated, user } = useAuthentication();
  const { data: bandsData, error: bandsError } = useSWR(
    isAuthenticated ? `/api/bands` : null,
    fetcher,
  );

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return null;
  if (!bandsData) return null;

  const { bands } = bandsData;
  return (
    <>
      <footer>
        <div className="side-scroll">
          {bands.map(band => (
            <Link href={`/bands/[band]`} as={`/bands/${band.slug}`}>
              <a className="band">
                <span>{band.name}</span>
              </a>
            </Link>
          ))}
        </div>
        <Link href="/profile">
          <a className="profile">
            <Avatar alt={user.name} src={user.picture} size="30px" />
          </a>
        </Link>
      </footer>

      <style jsx>{`
        footer {
          display: flex;
          box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
        }

        .profile {
          display: block;
          padding: 8px;
          border-left: 1px solid #ddd;
          flex-shrink: 0;
        }

        .side-scroll {
          display: flex;
          overflow-x: scroll;
          white-space: nowrap;
          flex-grow: 1;
          flex-shrink: 1;
        }
        @media (min-width: 768px) {
          .side-scroll {
            overflow-x: auto;
          }
        }

        .band {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 15px;
          text-decoration: none;
          color: #000;
          font-size: 1.1rem;
        }
        .band + .band {
          border-left: 1px solid #ddd;
        }
      `}</style>
    </>
  );
};

export default Footer;
