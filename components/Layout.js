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
        :global(body) {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
        }
        main {
          padding-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default Layout;
