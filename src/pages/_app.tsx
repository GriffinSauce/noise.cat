/* eslint-disable react/jsx-props-no-spreading */
import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import { SWRConfig } from 'swr';
import { UserProvider } from '@auth0/nextjs-auth0';
import fetcher from 'utils/fetcher';
import '../styles.css';

const App = ({
  Component,
  pageProps,
}: AppInitialProps & {
  Component: NextComponentType;
}) => {
  return (
    <UserProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  );
};

export default App;
