/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require('next-offline');

const offlineConfig = {
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
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
};

module.exports = withOffline({
  ...offlineConfig,
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ];
  },
  async headers() {
    return [
      { source: '/user/:id', headers: [{ key: 'x-path', value: 'hi' }] },

      {
        source: '/service-worker.js',
        headers: [
          { key: 'cache-control', value: 'public, max-age=43200, immutable' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ];
  },
});
