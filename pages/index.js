import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';

const Home = () => (
  <div>
    <Head>
      <title>noise.cat</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <section className="shows">
      <h1>Shows</h1>
      <div className="filter">
        <button>upcoming</button> / <button>past</button> / <button>all</button>
      </div>
      <ul>
        <li>
          <header>
            <div className="date">22-11</div>
            <div className="title">
              Feest Arjan @ De Schuit w/ Snowburner, Ken & Mary en Captain Slow
            </div>
          </header>
          <div className="location">De Schuit, Katwijk</div>
          <div className="note">Remy weet niet of hij kan.</div>
          <div className="contact">Arjan Zuijderduin</div>
          <div className="pay">?</div>
          <div className="status">Gevraagd</div>
        </li>
        <li>
          <header>
            <div className="date">30-11</div>
            <div className="title">
              Punkrock Academy, w/ I Against I & Camp High Gain
            </div>
          </header>
          <div className="location">Popcentrale, Dordrecht</div>
          <div className="note">Set: 21.00-21.30 Backline?</div>
          <div className="contact">Bob, I Against I</div>
          <div className="pay">€150</div>
          <div className="status">Bevestigd</div>
        </li>
        <li>
          <header>
            <div className="date">30-11</div>
            <div className="title">Verjaardag Ome Took (40)</div>
          </header>
          <div className="location">V11, Rotterdam</div>
          <div className="note">0.00 uur slot</div>
          <div className="contact">Steven Parmessar</div>
          <div className="pay">?</div>
          <div className="status">Bevestigd</div>
        </li>
        <li>
          <header>
            <div className="date">4-1</div>
            <div className="title">Verjaardag Joëlle (30) en Carlien</div>
          </header>
          <div className="location">Antwerp Music City, Antwerpen</div>
          <div className="contact">Joëlle Laes</div>
          <div className="pay">Onderhandeling</div>
          <div className="status">Bevestigd</div>
        </li>
        <li>
          <header>
            <div className="date">29 april - 3 mei</div>
            <div className="title">Japan</div>
          </header>
          <div className="location">Japan</div>
          <div className="note">
            RNR tours werkt aan deze data Vertrek 26/4?
          </div>
          <div className="contact">Waki (Ryouhei Wakita)</div>
          <div className="pay">?</div>
          <div className="status">Onder constructie: bijna rond</div>
        </li>
      </ul>
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

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        margin: 20px 0;
      }
      li::after {
        display: block;
        content: '';
        margin: 20px 5px;
        height: 4px;
        background-color: #f1f1f1;
        border-radius: 4px;
      }

      header {
        display: flex;
        margin: 0 0 10px 0;
      }
      .date {
        flex-shrink: 0;
        margin: 0 10px 0 0;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 4px;
      }
      .title {
        font-weight: 600;
      }
    `}</style>
  </div>
);

export default Home;
