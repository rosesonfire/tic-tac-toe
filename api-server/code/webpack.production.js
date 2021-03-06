/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          keep_classnames: true,
        },
      }),
    ],
  },
};
