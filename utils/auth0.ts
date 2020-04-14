import './dotenv';
import { IncomingMessage } from 'http';
import { initAuth0 } from '@auth0/nextjs-auth0';

const DOMAIN = process.env.NOW_URL;
if (!DOMAIN) throw new Error('env variable NOW_URL is required');

const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENTID as string,
  clientSecret: process.env.AUTH0_SECRET as string,
  scope: 'openid profile',
  redirectUri: `https://${DOMAIN}/api/callback`,
  postLogoutRedirectUri: DOMAIN,
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
