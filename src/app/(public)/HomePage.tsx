'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0/client';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Logo } from 'components/Logo';

interface Props {
  bands: Array<Band>;
}

const Home = ({ bands }: Props) => {
  // TODO: handle error and loading
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!bands?.length) return;
    router.push(`/bands/${bands[0].slug}`);
  }, [bands, router]);

  return (
    <section className="text-center">
      <Logo className="inline-block w-20 mt-20 mb-10" />
      <h1 className="mb-2 text-4xl">Noise.cat</h1>
      <p className="mb-20 text-gray-400 h2">Your band home</p>
      {user ? (
        <>
          {bands.length ? (
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
  );
};

export default Home;
