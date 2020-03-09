import Link from 'next/link';
import BandPicker from './BandPicker';
import { FiUser } from 'react-icons/fi';

const Nav = () => (
  <nav className="flex items-center justify-between border-b border-gray-200">
    <Link href="/">
      <a className="flex items-center p-3 text-2xl font-bold leading-none font-display">
        <img className="h-6 mr-3" src="/noisecat.svg" alt="logo" />
        <span>Noise.cat</span>
      </a>
    </Link>
    <BandPicker />
    <Link href="/profile">
      <a className="p-3 text-2xl">
        <FiUser />
      </a>
    </Link>
  </nav>
);

export default Nav;
