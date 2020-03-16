import '../styles/index.css';
import fetcher from '../utils/fetcher';
import { SWRConfig } from 'swr';

export default ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />;
    </SWRConfig>
  );
};
