import { initAuth0 } from '@auth0/nextjs-auth0';
import { NextApiRequest } from 'next';
import { ISession } from '@auth0/nextjs-auth0/dist/session/session';

const port = process.env.PORT || 3000;
const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
const domain = process.env.NOW_URL || `localhost:${port}`;
const host = `${protocol}${domain}`;

const config = {
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENTID as string,
  clientSecret: process.env.AUTH0_SECRET as string,
  scope: 'openid profile',
  redirectUri: `${host}/api/callback`,
  postLogoutRedirectUri: host,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET as string,
    cookieLifetime: 60 * 60 * 24 * 365 * 5, // Five years, YOLO
  },
};

const auth0 = initAuth0(config);

// Typing helper ¯\_(ツ)_/¯
// https://github.com/auth0/nextjs-auth0/issues/103
const getSessionFromReq = async (req: NextApiRequest): Promise<ISession> => {
  const session = await auth0.getSession(req);
  return (session as unknown) as ISession;
};

export default {
  ...auth0,
  getSessionFromReq,
};
