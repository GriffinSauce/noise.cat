const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

console.log('localEnv', localEnv);
console.log('process.env', process.env);

module.exports = {
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  env: {
    AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
  },
};
