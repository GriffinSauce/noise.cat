import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import fetcher from 'utils/fetcher';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Button from 'components/Button';
import Loader from 'components/Loader';

const Join = () => {
  const router = useRouter();
  const {
    query: { band, slug, token },
    asPath,
  } = router;

  const redirectTo = asPath;

  const { user } = useUser();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const join = async () => {
      try {
        await fetcher<void>(`/api/invites?${qs.stringify({ slug, token })}`);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setError('Error fetching invite');
        return;
      }
      router.push(`/bands/[band]`, `/bands/${slug}`);
    };

    if (user) join();
  }, [router, slug, token, user]);

  return (
    <Layout header={false} footer={false}>
      <Container>
        <section className="p-4 text-center">
          <img
            className="inline-block w-20 mt-20 mb-10"
            src="/noisecat.svg"
            alt="logo"
          />
          <h1 className="mb-2 text-4xl">Noise.cat</h1>
          <p className="mb-20 text-gray-400 h2">Join {band}</p>
          {user ? (
            <Link
              href={`/api/login?redirectTo=${encodeURIComponent(redirectTo)}`}
            >
              <Button inline color="green">
                Sign in
              </Button>
            </Link>
          ) : (
            <>
              {error ? (
                <p>
                  Your invite is expired or invalid, please ask for a new one
                </p>
              ) : (
                <Loader inline />
              )}
            </>
          )}
        </section>
      </Container>
    </Layout>
  );
};

export default Join;
