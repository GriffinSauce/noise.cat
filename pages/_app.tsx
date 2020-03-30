/* eslint-disable react/jsx-props-no-spreading */
import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/app';
import '../styles/index.css';
import { SWRConfig } from 'swr';
import fetcher from '../utils/fetcher';

export default ({
  Component,
  pageProps,
}: AppInitialProps & {
  Component: NextComponentType;
}) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
};
