import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';
import useAuthentication from '../utils/useAuthentication';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Home = () => {
  const { isAuthenticated } = useAuthentication();
  const router = useRouter();
  const { data } = useSWR<{
    bands: Array<Band>;
  }>(`/api/bands`);
  useEffect(() => {
    if (!data?.bands?.length) return;
    router.push(`/bands/[band]`, `/bands/${data?.bands[0].slug}`);
  }, [data]);
  return (
    <Layout header={false} footer={false}>
      <section className="text-center">
        <img
          className="inline-block w-20 mt-20 mb-10"
          src="/noisecat.svg"
          alt="logo"
        />
        <h1 className="mb-2 text-4xl">Noise.cat</h1>
        <p className="mb-20 text-gray-400 h2">Your band home</p>
        {isAuthenticated === false ? (
          <Link href="/api/login">
            <a>
              <Button inline color="green">
                Sign in
              </Button>
            </a>
          </Link>
        ) : (
          <>
            {data && !data.bands.length ? (
              <Link href="/profile">
                <a>
                  <Button inline color="green">
                    View profile
                  </Button>
                </a>
              </Link>
            ) : (
              <Loader inline />
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
