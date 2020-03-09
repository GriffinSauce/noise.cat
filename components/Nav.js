import Link from 'next/link';

const Nav = () => (
  <nav className="flex items-center border-b border-gray-200">
    <Link href="/">
      <a className="flex items-center text-2xl font-bold font-display">
        <img className="mx-3" src="/noisecat.svg" alt="logo" />
        <span>Noise.cat</span>
      </a>
    </Link>

    <style jsx>{`
      nav {
        height: 50px;
      }
      img {
        height: 1em;
      }
    `}</style>
  </nav>
);

export default Nav;
