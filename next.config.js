require('dotenv').config();
const withOffline = require('next-offline');

module.exports = withOffline({
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  env: {
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
    CS_API_URL: process.env.CS_API_URL,
    LA_NOTION_TOKEN: process.env.LA_NOTION_TOKEN,
  },
});
