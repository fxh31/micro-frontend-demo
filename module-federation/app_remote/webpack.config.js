const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container; // 引入模块联邦插件
const path = require('path');
const deps = require('./package.json').dependencies; // 获取依赖

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
    // 如遇到跨域问题需配置
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  stats: 'errors-only',
  entry: './src/index',
  output: {
    publicPath: 'auto',
    // clean: true // 生产环境打开
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { presets: ['@babel/preset-react'] }
      }
    ]
  },
  plugins: [
    // 配置模块联邦插件
    new ModuleFederationPlugin({
      name: 'app_remote', // remote 应用唯一名称
      filename: 'remoteEntry.js', // 暴露给外部的入口文件名称
      exposes: {
        // 定义要暴露的模块
        './Button': './src/Button.jsx' // 外部通过 app_remote/Button 引用
      },
      shared: {
        // 配置模块共享
        ...deps, // 将所有依赖都共享
        react: {
          singleton: true, // 确保只有一个实例
          requiredVersion: deps.react, // 确保版本一致
          // eager: true
        },
        'react-dom': {
          singleton: true, // 确保单例
          requiredVersion: deps['react-dom'],
          // eager: true
        }

      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
  
}