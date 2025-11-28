// build > webpack.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageName = require('../package.json').name;


/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    // filename: 'public/js/[name].[contenthash:8].js',
    filename: 'vue3-app.js', // 输出文件名（方便主应用注册时能找到）
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    // library: 'vue3-app',
    publicPath: 'auto',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: 'asset/resource', 			// 使用 asset/resource 类型
        generator: {
          filename: 'public/images/[name].[contenthash:8][ext]', 	// 输出目录和文件名格式
        },
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      // filename: 'public/css/[name].[contenthash:8].css'
      filename: 'public/css/style.css', // 打包在一起主应用方便访问使用
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      // vue: 'vue/dist/vue.esm-bundler.js',
    },
    // extensions: ['.js', '.vue', '.json']
  },
  stats: {
    // 显示详细信息
    all: false,
    assets: true, // 显示打包的文件
    timings: true, // 显示构建时间
    modules: false,
    chunks: false,
    version: true, // 显示 Webpack 版本
    errors: true, // 显示错误
  }
}
