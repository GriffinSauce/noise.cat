import useAuthentication from '../utils/useAuthentication';
import Button from './Button';

const LoginButton = () => {
  const { isAuthenticated, user } = useAuthentication();
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
      <a href="/api/login">
        <Button inline color="green">
          Sign in
        </Button>
      </a>
    );
  }
  return (
    <a href="/profile">
      <Button inline color="green">
        View profile
      </Button>
    </a>
  );
};

export default LoginButton;
