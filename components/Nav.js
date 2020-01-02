import Link from 'next/link';
import NavUser from './NavUser';

const Nav = () => (
  <nav>
    <ul>
      <li></li>

      <li>
        <Link href="/">
          <a>
            <div className="logo">
              <img src="/openmoji-smiley_cat.svg" />
              <img src="/openmoji-loudspeaker.svg" />
            </div>
            noise.cat
          </a>
        </Link>
      </li>
      <li>
        <NavUser />
      </li>
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: center;
      }
      nav > ul {
        display: flex;
        justify-content: space-between;
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }

      .logo {
        display: flex;
      }
      .logo img {
        width: 30px;
      }
    `}</style>
  </nav>
);

export default Nav;
