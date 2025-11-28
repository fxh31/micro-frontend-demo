// build > webpack.dev.js
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: '../dist',
    hot: true,
    open: true,
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
})
