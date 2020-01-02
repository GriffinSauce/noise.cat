import Layout from '../../../components/Layout';
import Nav from '../../../components/Nav';
import Shows from '../../../components/Shows';
import ShowsHorizontal from '../../../components/ShowsHorizontal';
import { FiRotateCcw } from 'react-icons/fi';
import { useState } from 'react';

import data from '../../../data.json';

const Band = () => {
  const [horizontal, setHorizontal] = useState(true);
  return (
    <Layout>
      <Nav />

      <section className="shows">
        <h1>Shows</h1>

        <div className="controls">
          <button className="view" onClick={() => setHorizontal(!horizontal)}>
            <FiRotateCcw /> {horizontal ? 'Lijst' : 'Tabel'}
          </button>

          <div className="filter">
            <button className="active">toekomst</button>
            <button>verleden</button>
            <button>alles</button>
          </div>
        </div>

        {horizontal ? <ShowsHorizontal shows={data} /> : <Shows shows={data} />}
      </section>

      <style jsx>{`
        section {
          padding: 0 30px;
        }

        h1 {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }

        .controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0;
        }
        .controls > * + * {
          margin-left: 20px;
        }

        .filter {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .filter button {
          font-size: 14px;
          padding: 10px 15px;
          border: none;
          background-color: #f0f0f0;
        }
        .filter button:first-child {
          border-radius: 4px 0 0 4px;
        }
        .filter button:last-child {
          border-radius: 0 4px 4px 0;
        }
        .filter button.active {
          background-color: #c3e4d7;
        }

        button.view {
          font-size: 14px;
          padding: 10px 15px;
          border: none;
          background-color: #f0f0f0;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Band;
