import { useRouter } from 'next/router';
import useSWR from 'swr';
import qs from 'qs';
import Skeleton from 'react-loading-skeleton';
import copyToClipboard from '../../../utils/copyToClipboard';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import Members from '../../../components/Members';
import Button from '../../../components/Button';
import fetcher from '../../../utils/fetcher';

const Settings = () => {
  const {
    query: { band: slug },
  } = useRouter();
  const { data } = useSWR<{ band: Band }>(slug ? `/api/bands/${slug}` : null);

  const copyInviteLink = async () => {
    if (!data) return;
    const { invite } = await fetcher<{ invite: Invite }>(`/api/invites`, {
      method: 'POST',
      body: {
        slug,
      },
    });
    const baseUrl = window.location.origin;
    copyToClipboard(
      `${baseUrl}/join?${qs.stringify({
        band: data?.band.name,
        token: invite.token,
        slug: invite.slug,
      })}`,
    );
  };

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <h3 className="font-display font-bold">Name</h3>
          <h2>{data?.band?.name || <Skeleton width={200} />}</h2>

          <h3 className="mt-4 block font-display font-bold">Members</h3>
          <Members />
          <h3 className="mt-4 block font-display font-bold">
            Invite new members
          </h3>
          <Button inline onClick={copyInviteLink}>
            Copy invite link
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Settings;
