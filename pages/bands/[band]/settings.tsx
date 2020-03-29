import { useRouter } from 'next/router';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import Members from '../../../components/Members';

const Settings = () => {
  const {
    query: { band: slug },
  } = useRouter();
  const { data } = useSWR(slug ? `/api/bands/${slug}` : null);

  const band = data?.band || {};
  return (
    <Layout>
      <Container>
        <div className="p-4">
          <h3 className="font-display font-bold">Name</h3>
          <h2>{band.name || <Skeleton width={200} />}</h2>

          <h3 className="mt-4 block font-display font-bold">Members</h3>
          <Members slug={`${slug}`} />
        </div>
      </Container>
    </Layout>
  );
};

export default Settings;
