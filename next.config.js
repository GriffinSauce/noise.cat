require('dotenv').config();
const withOffline = require('next-offline');

module.exports = withOffline({
  env: {
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
    CS_API_URL: process.env.CS_API_URL,
    LA_NOTION_TOKEN: process.env.LA_NOTION_TOKEN,
  },
});
