'use client';
import { FunctionComponent } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import Container from 'components/Container';
import { Logo } from 'components/Logo';

const Header: FunctionComponent = () => {
  const { data } = useSWR(`/api/bands`);
  return (
    <div className="border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href={data?.bands?.length ? `/bands/${data?.bands[0].slug}` : '/'}
            className="flex items-center p-3 text-2xl font-bold leading-none font-display"
          >
            <Logo className="h-6 mr-3" />
            <span>Noise.cat</span>
          </Link>
          <Link href="/profile" className="p-3 text-2xl">
            <FiUser />
          </Link>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
