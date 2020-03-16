import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import fetcher from '../utils/fetcher';
import useAuthentication from '../utils/useAuthentication';
import Avatar from './Avatar';
import Button from './Button';

const Members = ({ slug }) => {
  const { user } = useAuthentication();
  const { data } = useSWR(slug ? `/api/bands/${slug}/members` : null);
  const [removeState, setRemoveState] = useState(null);

  const removeMember = async memberId => {
    setRemoveState('loading');
    try {
      await fetcher(`/api/bands/${slug}/members`, {
        method: 'PUT',
        body: {
          members: data.ids.filter(id => id !== memberId),
        },
      });
      mutate({
        members: data.members.filter(member => member.user_id !== memberId),
      });
    } catch (err) {
      console.error(err);
    }
    setRemoveState(null);
  };

  if (!data) return null;
  return (
    <ul>
      {data.members.map(member => (
        <li
          key={member.user_id}
          className="flex items-center justify-between mb-1"
        >
          <div className="flex items-center">
            <Avatar alt={member.name} src={member.picture} />
            <div>
              <div className="ml-2 font-display font-bold">{member.name}</div>
              <div className="ml-2 font-display font-semibold text-xs text-gray-600">
                {member.email}
              </div>
            </div>
          </div>
          {member.user_id !== user.sub ? (
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
