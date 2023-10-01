'use client';
import { SWRConfig } from 'swr';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import fetcher from 'utils/fetcher';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>
    <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
  </UserProvider>
);

export default Providers;
