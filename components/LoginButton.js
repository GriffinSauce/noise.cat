import useAuthentication from '../utils/useAuthentication';
import Link from 'next/link';
import Button from './Button';

const LoginButton = () => {
  const { isAuthenticated } = useAuthentication();
  if (isAuthenticated === null) {
    return (
      <Button inline>
        <span className="opacity-0">Sign in</span>
        <span className="absolute text-gray-400">• • •</span>
      </Button>
    );
  }
  if (!isAuthenticated) {
    return (
      <Link href="/api/login">
        <a>
          <Button inline color="green">
            Sign in
          </Button>
        </a>
      </Link>
    );
  }
  return (
    <Link href="/profile">
      <a>
        <Button inline color="green">
          View profile
        </Button>
      </a>
    </Link>
  );
};

export default LoginButton;
