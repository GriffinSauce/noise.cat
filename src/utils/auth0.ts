import { initAuth0 } from '@auth0/nextjs-auth0';

const port = process.env.PORT || 3000;
const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
const deploymentDomain = process.env.NOW_URL || `localhost:${port}`;
const domain = process.env.PRODUCTION ? 'noise.cat' : deploymentDomain; // The deployment URL is always the xyz-noisecat.now.sh url, not the actual prod URL
const host = `${protocol}${domain}`;

const auth0 = initAuth0({
  baseURL: host,
  issuerBaseURL: process.env.AUTH0_DOMAIN as string,
  clientID: process.env.AUTH0_CLIENTID as string,
  clientSecret: process.env.AUTH0_SECRET as string,
  secret: process.env.AUTH0_COOKIE_SECRET as string,
  routes: {
    callback: '/api/callback',
    postLogoutRedirect: '/',
  },
  authorizationParams: {
    scope: 'openid profile',
  },
  session: {
    rollingDuration: 60 * 60 * 24 * 365 * 5, // Five years, YOLO
  },
});

export default auth0;
