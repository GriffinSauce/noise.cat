import dotenv from './dotenv';
import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_SECRET,
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
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 24 * 365 * 5, // Five years, YOLO
  },
});
