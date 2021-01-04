/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: [path.join(__dirname, 'src/server.ts')],
  experiments: {
    topLevelAwait: true,
  },
  externals: [nodeExternals({})],
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'api-server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      '@api-types': path.resolve(__dirname, 'src', 'types'),
      '@config': path.resolve(__dirname, 'src', 'config'),
      '@constants': path.resolve(__dirname, 'src', 'constants'),
      '@db': path.resolve(__dirname, 'src', 'db'),
      '@graphql': path.resolve(__dirname, 'src', 'graphql'),
    },
    extensions: ['.ts', '.js'],
  },
  target: 'node',
};
