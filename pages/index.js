import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Shows from '../components/Shows';

import data from '../data.json';

const Home = () => (
  <Layout>
    <Nav />

    <section className="shows">
      <h1>Shows</h1>
      <div className="filter">
        <button>upcoming</button> / <button>past</button> / <button>all</button>
      </div>

      <Shows shows={data} />
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

      .filter {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .filter button {
        padding: 10px;
        border: none;
        background-color: transparent;
      }
    `}</style>
  </Layout>
);

export default Home;
