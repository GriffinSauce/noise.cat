import useSWR from 'swr';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import Container from './Container';

const Header = () => {
  const { data } = useSWR(`/api/bands`);
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href={data?.bands?.length ? '/bands/[band]' : '/'}
            as={data?.bands?.length ? `/bands/${data?.bands[0].slug}` : '/'}
          >
            <a className="flex items-center p-3 text-2xl font-bold leading-none font-display dark:font-semibold dark:text-gray-600">
              <img className="h-6 mr-3" src="/noisecat.svg" alt="logo" />
              <span>Noise.cat</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className="p-3 text-2xl dark:text-gray-600">
              <FiUser />
            </a>
          </Link>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
