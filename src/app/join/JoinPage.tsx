'use client';
import Link from 'next/link';
import qs from 'qs';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import fetcher from 'utils/fetcher';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Logo } from 'components/Logo';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Join = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const band = urlParams?.get('band');
  const slug = urlParams?.get('slug');
  const token = urlParams?.get('token');

  const redirectTo = usePathname();

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
      router.push(`/bands/${slug}`);
    };

    if (user) join();
  }, [router, slug, token, user]);

  return (
    <Layout header={false} footer={false}>
      <Container>
        <section className="p-4 text-center">
          <Logo className="inline-block w-20 mt-20 mb-10" />
          <h1 className="mb-2 text-4xl">Noise.cat</h1>
          <p className="mb-20 text-gray-400 h2">Join {band}</p>
          {user && redirectTo ? (
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
