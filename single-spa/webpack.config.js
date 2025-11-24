const path = require('path');

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const singleSpaDefaults = require("webpack-config-single-spa-ts");

/** @type {import('webpack').Configuration} */
module.exports = (webpackConfigEnv, argv) => {
  return  {
    mode: 'development',
    // entry: {
    //   main: './index.js',
    // },
    entry: './index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Single Spa',
        // template: "./index.ejs",
        // templateParameters: {
        //   isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
        //   orgName,
        // },
        template: './index.html',
      }),
    ],
    devServer: {
      static: './dist',
      historyApiFallback: true, // 告诉开发服务器对于未知路由返回 index.html
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/, // 主应用需要识别 react 的 jsx 文件
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          // sideEffects: true,
        }, 
      ]
    }
  }
}