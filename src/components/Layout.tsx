import { FunctionComponent } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import Footer from 'components/Footer';

type Props = {
  header?: boolean;
  footer?: boolean;
};

// TODO: Review font usage and trim
const Layout: FunctionComponent<Props> = ({
  children,
  header = true,
  footer = true,
}) => {
  return (
    <>
      <Head>
        <title>noise.cat</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col h-screen">
        {header ? <Header /> : null}
        <main className="flex-grow">{children}</main>
        {footer ? <Footer /> : null}
      </div>
    </>
  );
};

export default Layout;