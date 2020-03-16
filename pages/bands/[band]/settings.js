import { useRouter } from 'next/router';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import fetcher from '../../../utils/fetcher';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import Members from '../../../components/Members';

const Settings = () => {
  const {
    query: { band: slug },
  } = useRouter();
  const { data } = useSWR(slug ? `/api/bands/${slug}` : null, fetcher);

  const band = data?.band || {};
  return (
    <Layout>
      <Container>
        <div className="p-4">
          <label className="font-display font-bold">Name</label>
          <h2>{band.name || <Skeleton width={200} />}</h2>

          <label className="mt-4 block font-display font-bold">Members</label>
          <Members slug={slug} />
        </div>
      </Container>
    </Layout>
  );
};

export default Settings;
