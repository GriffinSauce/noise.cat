import fetcher from './fetcher';
import useSWR from 'swr';

export default () => {
  const { data: user, error } = useSWR('/api/me', fetcher);
  let isAuthenticated = null;
  if (user) isAuthenticated = true;
  if (!user && error) isAuthenticated = false;

  return {
    isAuthenticated, // null | false | true
    user,
  };
};
