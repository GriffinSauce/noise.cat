import Layout from '../components/Layout';
import Nav from '../components/Nav';
import LoginButton from '../components/LoginButton';
import Shows from '../components/Shows';
import ShowsHorizontal from '../components/ShowsHorizontal';
import { FiRotateCcw } from 'react-icons/fi';
import { useState } from 'react';

import data from '../data.json';

const Home = () => {
  const [horizontal, setHorizontal] = useState(true);
  return (
    <Layout>
      <Nav />

      <section>
        <h1>Noisecat!</h1>

        <p>Meow.</p>

        <p>
          <LoginButton />
        </p>
      </section>

      <style jsx>{`
        section {
          padding: 0 30px;
          text-align: center;
        }

        h1 {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
