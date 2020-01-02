import fetcher from '../utils/fetcher';
import useSWR from 'swr';

export default () => {
  const { data: user, error } = useSWR('/api/me', fetcher);
  let isAuthenticated = null;
  if (user) isAuthenticated = true;
  if (!user && error && error.message.includes('401')) isAuthenticated = false;

  return {
    isAuthenticated, // null | false | true
    user,
  };
};
