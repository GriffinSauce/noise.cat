/* eslint-disable react/jsx-props-no-spreading */
import '../styles/index.css';
import { SWRConfig } from 'swr';
import fetcher from '../utils/fetcher';

export default ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
};
