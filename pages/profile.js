import auth0 from '../utils/auth0';
import axios from 'axios';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Container from '../components/Container';

const Profile = ({ user }) => {
  const { data } = useSWR(`/api/bands`, fetcher);
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

// FIXME: does server render AND client render - probably better to just do all client side
Profile.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const { user } = await auth0.getSession(req);
    if (!user) {
      res.writeHead(302, {
        Location: '/api/login',
      });
      res.end();
      return;
    }

    return { user };
  }

  const clientSideRedirect = () => {
    window.location.href = '/';
  };
  try {
    const { data: user } = await axios('/api/me');
    if (!user) return clientSideRedirect();
    return { user };
  } catch (err) {
    clientSideRedirect();
  }
};

export default Profile;
