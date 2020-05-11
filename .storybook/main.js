const path = require('path');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  stories: ['../**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.modules.push(
      path.resolve(__dirname, '..', compilerOptions.baseUrl),
    );
    return config;
  },
};
