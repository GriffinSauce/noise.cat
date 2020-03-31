import './dotenv';
import { IncomingMessage } from 'http';
import { initAuth0 } from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENTID as string,
  clientSecret: process.env.AUTH0_SECRET as string,
  scope: 'openid profile',
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://noise.cat/api/callback'
      : 'http://localhost:3000/api/callback',
  postLogoutRedirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://noise.cat/'
      : 'http://localhost:3000/',
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET as string,
    cookieLifetime: 60 * 60 * 24 * 365 * 5, // Five years, YOLO
  },
});

// Typing helper ¯\_(ツ)_/¯
const getSessionFromReq = async (req: NextConnectRequest) => {
  const session = await auth0.getSession((req as unknown) as IncomingMessage);
  return (session as unknown) as {
    user: User;
  };
};

export default {
  ...auth0,
  getSessionFromReq,
};
