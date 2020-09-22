/* eslint-disable react/jsx-props-no-spreading */
import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import { SWRConfig } from 'swr';
import fetcher from 'utils/fetcher';
import '../styles.css';

const App = (
  {
    Component,
    pageProps,
  }: AppInitialProps & {
    Component: NextComponentType;
  }
) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default App;
