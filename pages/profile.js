import auth0 from '../utils/auth0';
import axios from 'axios';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const Profile = ({ user }) => {
  return (
    <Layout>
      <Nav />

      <section>
        <h1>{user.name}</h1>
      </section>
      <section>
        <ul>
          <li>
            <Link href="/bands/coral-springs">
              <a className="h2">
                Coral Springs <FiArrowRight />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/bands/left-alive">
              <a className="h2">
                Left Alive <FiArrowRight />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/bands/all">
              <a className="h2">
                All <FiArrowRight />
              </a>
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <p>
          <a href="/api/logout">Logout</a>
        </p>
      </section>

      <style jsx>{`
        section {
          padding: 0 30px 30px;
          text-align: center;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin: 15px 0;
        }

        a {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: #000;
        }
      `}</style>
    </Layout>
  );
};

// FIXME: does server render AND client render - probably better to just do all client side
Profile.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const { user } = await auth0.getSession(req);
    if (!user) {
      res.writeHead(302, {
        Location: '/api/login',
      });
      res.end();
      return;
    }

    return { user };
  }

  const clientSideRedirect = () => {
    window.location.href = '/';
  };
  try {
    const { data: user } = await axios('/api/me');
    if (!user) return clientSideRedirect();
    return { user };
  } catch (err) {
    clientSideRedirect();
  }
};

export default Profile;
