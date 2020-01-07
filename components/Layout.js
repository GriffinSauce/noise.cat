import Head from 'next/head';

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
      <main>{children}</main>
      <style jsx>{`
        main {
          padding-bottom: 50px;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #000;
        }

        h1,
        .h1 {
          font-size: 1.6rem;
          font-weight: 700;
        }
        h2,
        .h2 {
          font-size: 1.4rem;
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
