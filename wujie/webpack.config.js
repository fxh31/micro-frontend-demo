const HTMLWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // output: {
  //   path: __dirname + '/dist',
  //   filename: 'index_bundle.js',
  // },
  devServer: {
    port: 3100,
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Wujie App',
      template: './index.html',
    }),
  ],
  module: {
    rules: [

    ],
  }
}