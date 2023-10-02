'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import qs from 'qs';
import Skeleton from 'react-loading-skeleton';
import copyToClipboard from 'lib/copyToClipboard';
import fetcher from 'utils/fetcher';
import Container from 'components/Container';
import Members from 'components/Members';
import Button from 'components/Button';

const Settings = () => {
  const slug = useParams<{ band: string }>()?.band;
  const { data } = useSWR<{ band: Band }>(slug ? `/api/bands/${slug}` : null);
  const [inviteState, setInviteState] = useState<null | 'loading'>(null);

  const copyInviteLink = async () => {
    if (!data) return;
    setInviteState('loading');
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
    setInviteState(null);
  };

  return (
    <Container>
      <div className="p-4">
        <h1 className="mb-3">Band</h1>
        <h3 className="label">Name</h3>
        <h2>{data?.band?.name || <Skeleton width={200} />}</h2>

        <h3 className="block mt-4 label">Members</h3>
        <Members />
        <h3 className="block mt-4 label">Invite new members</h3>
        <Button inline state={inviteState} onClick={copyInviteLink}>
          Copy invite link
        </Button>
      </div>
    </Container>
  );
};

export default Settings;
