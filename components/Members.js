import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Avatar from './Avatar';

const Members = ({ slug }) => {
  const { data } = useSWR(slug ? `/api/bands/${slug}/members` : null, fetcher);

  if (!data) return null;
  return (
    <ul>
      {data.members.map(user => (
        <li className="flex items-center mb-1">
          <Avatar alt={user.name} src={user.picture} />
          <span className="ml-2 font-display font-bold">{user.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Members;
