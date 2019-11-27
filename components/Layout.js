import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>noise.cat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        main {
          padding-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default Layout;
