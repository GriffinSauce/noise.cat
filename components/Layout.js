import Head from 'next/head';
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
      <div className="page">
        <main>{children}</main>
        {footer ? <Footer /> : null}
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        main {
          flex-grow: 1;
          padding-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default Layout;
