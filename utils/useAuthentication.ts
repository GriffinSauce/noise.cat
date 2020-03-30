import useSWR from 'swr';
import fetcher from './fetcher';

type User = {
  sub: string;
  name: string;
  picture: string;
};
type Return = { isAuthenticated: null | boolean; user?: User };

const useAuthentication = (): Return => {
  const { data: user, error } = useSWR<User>('/api/me', fetcher);
  let isAuthenticated = null;
  if (user) isAuthenticated = true;
  if (!user && error) isAuthenticated = false;

  return {
    isAuthenticated, // null | false | true
    user,
  };
};

export default useAuthentication;
