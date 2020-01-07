import Link from 'next/link';
import Avatar from '../components/Avatar';
import useAuthentication from '../utils/useAuthentication';

const NavUser = () => {
  const { isAuthenticated, user } = useAuthentication();

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) {
    return (
      <>
        <a href="/api/login">Login</a>
        <style jsx>{``}</style>
      </>
    );
  }

  return (
    <>
      <Link href="/profile">
        <Avatar alt={user.name} src={user.picture} />
      </Link>
      <style jsx>{``}</style>
    </>
  );
};

export default NavUser;
