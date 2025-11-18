const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container; // 引入模块联邦插件
const path = require('path');
const deps = require('./package.json').dependencies; // 获取依赖

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
  },
  stats: 'errors-only',
  entry: './src/index',
  output: {
    publicPath: '/', // http://localhost:3000/
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
      name: 'app_host', // 当前 host 应用唯一名称
      // filename: 'remoteEntry.js', // 暴露给外部的入口文件名称（host 通常不暴露模块，所以不需要 filename）
      remotes: {
        // 定义要引用的 Remote 应用
        // app_remote：本地应用使用别名和其对应的 remote 应用入口
        'app_remote': 'app_remote@http://localhost:3001/remoteEntry.js'
      },
      
      shared: {
        // 配置模块共享
        ...deps, // 将需与 remote 的配置兼容
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