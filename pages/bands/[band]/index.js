import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';
import Layout from '../../../components/Layout';
import Nav from '../../../components/Nav';
import Shows from '../../../components/Shows';
import ShowsHorizontal from '../../../components/ShowsHorizontal';
import { FiRotateCcw } from 'react-icons/fi';

const Band = () => {
  const [horizontal, setHorizontal] = useState(false);

  // Get shows data
  const {
    query: { band },
  } = useRouter();
  const { data } = useSWR(band ? `/api/bands/${band}/shows` : null, fetcher);

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

        {data ? (
          <>
            {horizontal ? (
              <ShowsHorizontal shows={data.shows} />
            ) : (
              <Shows shows={data.shows} />
            )}
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
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

        .loading {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Band;
