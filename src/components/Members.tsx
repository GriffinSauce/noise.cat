import { useState, FunctionComponent } from 'react';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import fetcher from 'lib/fetcher';
import { useUser } from '@auth0/nextjs-auth0/client';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import { useParams } from 'next/navigation';

type Props = {};

type User = {
  user_id: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
};

const Members: FunctionComponent<Props> = () => {
  const { user } = useUser();

  const slug = useParams<{ band: string }>()?.band;

  const { data, mutate } = useSWR<{ members: Array<User>; ids: Array<string> }>(
    slug ? `/api/bands/${slug}/members` : null,
  );

  const [removeState, setRemoveState] = useState<null | 'loading'>(null);

  const removeMember = async (memberId: string) => {
    if (!data) return;
    setRemoveState('loading');
    try {
      await fetcher(`/api/bands/${slug}/members`, {
        method: 'PUT',
        body: {
          members: data.ids.filter((id) => id !== memberId),
        },
      });
      mutate({
        members: data.members.filter((member) => member.user_id !== memberId),
        ids: data.ids,
      });
    } catch (err) {
      console.error(err);
    }
    setRemoveState(null);
  };

  // TODO: find a way to merge loading skeleton better into layout so it stays in sync
  if (!data)
    return (
      <div className="flex items-center">
        <Avatar alt="" src="" loading />
        <div>
          <div className="ml-2 font-bold font-display">
            <Skeleton width={100} />
          </div>
          <div className="ml-2 text-xs font-semibold text-gray-600 font-display">
            <Skeleton width={130} />
          </div>
        </div>
      </div>
    );
  return (
    <ul>
      {data.members.map((member) => (
        <li
          key={member.user_id}
          className="flex items-center justify-between mb-1"
        >
          <div className="flex items-center">
            <Avatar alt={member.name} src={member.picture} />
            <div>
              <div className="ml-2 font-bold font-display">{member.name}</div>
              <div className="ml-2 text-xs font-semibold text-gray-600 font-display">
                {member.email}
              </div>
            </div>
          </div>
          {member.user_id !== user?.sub ? (
            <Button
              state={removeState}
              inline
              onClick={() => removeMember(member.user_id)}
            >
              Remove
            </Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default Members;
