import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import useAuthentication from '../utils/useAuthentication';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Container from '../components/Container';

const Profile = () => {
  const { isAuthenticated, user } = useAuthentication();
  const { data } = useSWR(isAuthenticated ? `/api/bands` : null, fetcher);

  if (!isAuthenticated) {
    // Should redirect to login
    if (process.browser) {
      window.location = '/';
      return;
    } else {
      return null;
    }
  }
  return (
    <Layout>
      <Container>
        <div className="p-4">
          <section className="mb-6">
            <h1>Profile</h1>
            <div className="flex items-center mt-2">
              <Avatar alt={user.name} src={user.picture} size="40px" />
              <p className="ml-2 font-semibold font-display">{user.name}</p>
            </div>
          </section>
          <section className="mb-6">
            <h2 className="h1">Bands</h2>
            <ul className="mb-6">
              {data ? (
                data.bands.map(band => (
                  <li>
                    <Link href="/bands/[band]" as={`/bands/${band.slug}`}>
                      <a className="block py-2 h3">{band.name}</a>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-2 h3">
                  <Skeleton width={100} />
                </li>
              )}
            </ul>
          </section>
          <a href="/api/logout">
            <Button>Log out</Button>
          </a>
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;
