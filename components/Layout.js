import Head from 'next/head';
import Footer from './Footer';

// TODO: Review font usage and trim
const Layout = ({ children }) => {
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
        <Footer />
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
      <style jsx global>{`
        html {
          font-size: 13px; /* for rem */
          font-family: 'Open Sans', sans-serif;
          color: #000;
        }
        body {
          margin: 0;
        }

        h1,
        .h1 {
          font-size: 1.8rem;
          font-weight: 700;
        }
        h2,
        .h2 {
          font-size: 1.6rem;
          font-weight: 700;
        }
        h3,
        .h3 {
          font-size: 1.2rem;
          font-weight: 700;
        }
        h4,
        .h4 {
          font-size: 1rem;
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

export default Layout;
