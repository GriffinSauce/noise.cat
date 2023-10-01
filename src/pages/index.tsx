import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0/client';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Image from 'next/image';
import { Logo } from 'components/Logo';

const Home = () => {
  // TODO: handle error and loading
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  const { data } = useSWR<{
    bands: Array<Band>;
  }>(`/api/bands`);

  useEffect(() => {
    if (!data?.bands?.length) return;
    router.push(`/bands/[band]`, `/bands/${data?.bands[0].slug}`);
  }, [data, router]);

  return (
    <Layout header={false} footer={false}>
      <section className="text-center">
        <Logo className="inline-block w-20 mt-20 mb-10" />
        <h1 className="mb-2 text-4xl">Noise.cat</h1>
        <p className="mb-20 text-gray-400 h2">Your band home</p>
        {user ? (
          <>
            {data && !data.bands.length ? (
              <Link href="/profile">
                <Button inline color="green">
                  View profile
                </Button>
              </Link>
            ) : (
              <Loader inline />
            )}
          </>
        ) : (
          <Link href="/api/auth/login">
            <Button inline color="green">
              Sign in
            </Button>
          </Link>
        )}
      </section>
    </Layout>
  );
};

export default Home;
