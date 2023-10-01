/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import { SWRConfig } from 'swr';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import fetcher from 'utils/fetcher';
import '../styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

const App = ({
  Component,
  pageProps,
}: AppInitialProps & {
  Component: NextComponentType;
}) => {
  return (
    <>
      <Head>
        <title>noise.cat</title>
      </Head>
      <UserProvider>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </UserProvider>
    </>
  );
};

export default App;
