require('dotenv').config();
module.exports = {
  env: {
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
  },
};
