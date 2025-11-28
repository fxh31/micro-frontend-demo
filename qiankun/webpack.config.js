const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Qian Kun',
      template: './index.html'
    }),
    new VueLoaderPlugin(), // 支持 Vue 
  ],
  devServer: {
    historyApiFallback: true, // 找不到对应路由重定向到 index.html（解决404）
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  }
}