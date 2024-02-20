import { getSession } from '@auth0/nextjs-auth0';
import HomePage from './HomePage';
import { getBands } from 'lib/database';
import { redirect } from 'next/navigation';

const getBandData = async () => {
  const session = await getSession();
  return getBands({ userId: session?.user?.sub });
};

export default async function Page() {
  const bands = await getBandData();
  if (bands.length) redirect(`/bands/${bands[0].slug}`);

  return <HomePage bands={bands} />;
}
