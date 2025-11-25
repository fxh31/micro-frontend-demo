const path = require('path');

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
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
      new VueLoaderPlugin(), // 定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    ],
    devServer: {
      static: './dist',
      historyApiFallback: true, // 告诉开发服务器对于未知路由返回 index.html
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
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
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/], // 让 ts-loader 也能处理 .vue 文件中的 ts 代码
            },
          },
        },
        {
          test: /\.vue$/, // 主应用需要识别 vue 的 .vue 文件
          loader: 'vue-loader'
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