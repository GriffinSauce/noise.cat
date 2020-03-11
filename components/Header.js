import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import Container from './Container';

const Header = () => (
  <div className="border-b border-gray-200">
    <Container>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center p-3 text-2xl font-bold leading-none font-display">
            <img className="h-6 mr-3" src="/noisecat.svg" alt="logo" />
            <span>Noise.cat</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className="p-3 text-2xl">
            <FiUser />
          </a>
        </Link>
      </nav>
    </Container>
  </div>
);

export default Header;
