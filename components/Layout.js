import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

// TODO: Review font usage and trim
const Layout = ({ children, footer = true }) => {
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
        <Header />
        <main className="flex-grow">{children}</main>
        {footer ? <Footer /> : null}
      </div>
    </>
  );
};

export default Layout;
