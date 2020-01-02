import useAuthentication from '../utils/useAuthentication';

const foregroundColor = '#eff0eb';
const backgroundColor = '#282a36';
const red = '#ff5c57';
const green = '#5af78e';
const yellow = '#f3f99d';
const blue = '#57c7ff';
const magenta = '#fb44af';
const cyan = '#9aedfe';

const LoginButton = () => {
  const { isAuthenticated, user } = useAuthentication();

  if (isAuthenticated === null) {
    return (
      <>
        <div>Sign in</div>
        <style jsx>{`
          div {
            display: inline-block;
            padding: 10px 12px 12px;
            color: transparent;
            text-decoration: none;
            background-color: transparent;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        `}</style>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <a href="/api/login">Sign in</a>
        <style jsx>{`
          a {
            display: inline-block;
            padding: 10px 12px 12px;
            color: #fff;
            text-decoration: none;
            background-color: ${magenta};
            border: 1px solid ${magenta};
            border-radius: 4px;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <a href="/profile">View profile</a>
      <style jsx>{`
        a {
          display: inline-block;
          padding: 10px 12px 12px;
          color: #fff;
          text-decoration: none;
          background-color: ${magenta};
          border: 1px solid ${magenta};
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default LoginButton;
