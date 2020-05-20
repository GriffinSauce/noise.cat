import useSWR from 'swr';
import fetcher from './fetcher';

type Return = { isAuthenticated: null | boolean; user?: User };

const useAuthentication = (): Return => {
  const { data: user, error } = useSWR<User>('/api/me', fetcher);
  let isAuthenticated: null | boolean = null;
  if (user) isAuthenticated = true;
  if (!user && error) isAuthenticated = false;

  return {
    isAuthenticated,
    user,
  };
};

export default useAuthentication;
