import Head from 'next/head';
import Nav from './Nav';

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
        <Nav />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};

export default Layout;
