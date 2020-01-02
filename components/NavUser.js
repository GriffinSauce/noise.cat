import Link from 'next/link';
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
        <img src={user.picture}></img>
      </Link>
      <style jsx>{`
        img {
          height: 30px;
          width: 30px;
          border-radius: 50px;
        }
      `}</style>
    </>
  );
};

export default NavUser;
