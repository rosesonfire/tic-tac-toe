/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new NodemonPlugin({
      delay: '1000',
      nodeArgs: ['--inspect=0.0.0.0:9230'],
      script: './dist/api-server.js',
      watch: path.resolve('./dist'),
      // args: ['demo'],
      // nodeArgs: ['--debug=9222'],
      // ignore: ['*.js.map'],
      // ext: 'js,njk,json',
      // verbose: true,
    }),
  ],
};
