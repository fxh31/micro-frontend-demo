const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageName = require('./package.json').name;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'home.js', // 对外输出打包后的文件（dev-server 会自动将其打包为指定文件）默认为 main
    library: 'home',
    // libraryTarget: 'umd',
    publicPath: 'auto',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    // path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 9001,
    // static: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
}