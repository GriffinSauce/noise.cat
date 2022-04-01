import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import Container from 'components/Container';
import ButtonLink from 'components/ButtonLink';

const Profile = () => {
  const { user, isLoading, error } = useUser();
  const { data } = useSWR<{ bands: Array<Band> }>(user ? `/api/bands` : null);

  if ((!user && !isLoading) || error) {
    if (typeof window !== undefined) {
      window.location.replace('/api/auth/login');
      return null;
    }
    return null;
  }
  return (
    <Layout>
      <Container>
        <div className="p-4">
          <section className="mb-6">
            <h1>Profile</h1>
            <div className="flex items-center mt-2">
              <Avatar alt={user?.name} src={user?.picture} size="40px" />
              <p className="ml-2 font-semibold font-display">
                {user?.name || <Skeleton width={100} />}
              </p>
            </div>
          </section>
          <section className="mb-6">
            <h2 className="h1">Bands</h2>
            {data ? (
              <>
                {data.bands.length ? (
                  <ul className="mb-6">
                    {data.bands.map((band) => (
                      <li key={band.slug}>
                        <Link href="/bands/[band]" as={`/bands/${band.slug}`}>
                          <a className="block py-2 h3">{band.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-2 mb-6">
                    <p className="text-gray-500">
                      Ask one of your bandmembers for an invite or
                    </p>
                    <Link href="/bands/new">
                      <ButtonLink color="green">Set up your band</ButtonLink>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="py-2 mb-6 h3">
                <Skeleton width={100} />
              </div>
            )}
          </section>
          <a href="/api/auth/logout">
            <Button>Log out</Button>
          </a>
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;
