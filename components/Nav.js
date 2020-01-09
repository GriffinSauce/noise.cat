import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/">
      <a>
        <div className="logo">
          <img src="/openmoji-smiley_cat.svg" />
          <img src="/openmoji-loudspeaker.svg" />
          <span>noise.cat</span>
        </div>
      </a>
    </Link>

    <style jsx>{`
      nav {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }

      .logo {
        display: flex;
        align-items: center;
      }
      .logo img {
        height: 24px;
      }
      .logo span {
        margin-left: 5px;
        font-size: 1.1rem;
        color: #575757;
      }
    `}</style>
  </nav>
);

export default Nav;
