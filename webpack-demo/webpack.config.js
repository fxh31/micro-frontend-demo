const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin'); // 生成 service worker，用于 pwa
const webpack = require("webpack");

// 尝试使用环境变量，如果没有则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/';

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV,
  // mode: 'development', // 确保 bundle 不会被压缩（tree sharking 依赖 esm import/export）
  // mode: 'production', // 该模式下会自动进行一个压缩和混淆
  // entry: './src/index-pwa.js', 
  // entry: './src/index.ts', 
  // entry: './src/index.js', // 默认名称为 main
  // entry: {
  //   // index: './src/index.js',
  //   // another: './src/another-module.js',
  //   // index: {
  //   //   import: './src/index.js',
  //   //   dependOn: 'shared', // 多个 chunk 之间共享模块
  //   // },
  //   // another: {
  //   //   import: './src/another-module.js',
  //   //   dependOn: 'shared', // 多个 chunk 之间共享模块
  //   // },
  //   // shared: 'lodash', // 多入口之间共享模块
  // },
  // entry: { page: ['./src/index.js', './src/another-module.js'] }, // 避免但多入口，可使用但入口多导入
  // entry: {
  //   app: './src/index.js',
  //   // 模块热替换的运行时代码
  //   hot: 'webpack/hot/dev-server.js',
  //   // 用于 web 套接字传输、热重载逻辑的 web server 客户端
  //   client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
  // },
  // entry: {
  //   polyfills: './src/polyfills',
  //   index: './src/index-shamming',
  // },
  // 每个入口使用多种文件类型
  entry: {
    home: ['./src/multipleEntry/home.js', './src/multipleEntry/home.scss'],
    account: ['./src/multipleEntry/account.js', './src/multipleEntry/account.scss'],
  },
  // devtool: 'inline-source-map', // js 提供 source map，打包后的文件的报错信息能映射到源码（便于开发）
  // webpack-dev-server 配置
  devServer: {
    static: './dist', // 从什么位置查找文件
    // 用于 web 套接字传输、热重载逻辑的 web server 客户端
    hot: false,  // 热替换（默认 true）
    client: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
    }),
    // css 压缩
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // 模块热替换的插件
    // new webpack.HotModuleReplacementPlugin(),
    // 插件定义全局变量（shamming）
    // new webpack.ProvidePlugin({
    //   // _: 'lodash',
    //   join: ['lodash', 'join'], // 数组路径，可以调用指定功能（可以更好的 tree sharking）
    // })
    // 生成一个 service worker
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助快速启用 ServiceWorkers，不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }), 
    // // 注入环境变量
    // new webpack.DefinePlugin({
    //   'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    // }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    // filename: 'bundle.js', // 单入口得到产物 dist/bundle.js
    filename: '[name].bundle.js', // 多入口得到产物 dist/index.bundle.js dist/print.bundle.js
    // filename: '[name].[contenthash].js', 
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // webpack-dev-server 会访问：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 
    publicPath: 'auto',
    // publicPath: ASSET_PATH,
    // 自定义资源输出指定目录（法一）
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  optimization: {
    // usedExports: true,
    // moduleIds: 'deterministic', // 保持 vendor 的哈希值不变
    // runtimeChunk: 'single', // 多入口文件时添加（否则可能会出现被引用的模块多次复制）；单入口也可以添加，它会为 runtime 分离到单独的 bundle 中
    // // SplitChunksPlugin 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
    // splitChunks: {
    //   // chunks: 'all',
    //   // 像 lodash 或 react 这样的第三方库很少像本地源代码一样频繁修改的库，推荐将其提取到单独的 vendor chunk 中，减少客户端对服务器的请求的同时保证自身代码与服务器一直
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     }
    //   }
    // }
  },
  // stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        // sideEffects: true,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // sideEffects: true,
      }, 
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: require.resolve('./src/index-shamming.js'),
      //   use: 'imports-loader?wrapper=window',
      // }, // 通过 imports-loader 覆盖 this 的指向，避免模块运行在 CommonJS 环境下时 this 指向问题
      // {
      //   test: require.resolve('./src/globals.js'),
      //   use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
      // }, // 通过 exports-loader 将一个全局变量作为一个普通的模块来导出。主要用于解决老版本库的兼容性问题
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   // generator: {
      //   //   filename: 'images/[name][ext]'
      //   // }
      // }, 
      {
        test: /\.svg/,
        type: 'asset/inline',
        // generator: {
        //   filename: 'images/[name][ext]'
        // }
      }, 
      // {
      //   test: /\.html/,
      //   type: 'asset/resource',
      //   // 自定义资源输出指定目录（方法二）
      //   // 所有 html 文件都将被发送到输出目录中的 static 目录中
      //   generator: {
      //     filename: 'static/[hash][ext][query]'
      //   }
      // },
      //  {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // }, 
      //  {
      //   test: /\.(csv|tsv)$/i,
      //   use: ['csv-loader'],
      // },
      // {
      //   test: /\.xml$/i,
      //   use: ['xml-loader'],
      // },
      //    {
      //   test: /\.toml$/i,
      //   type: 'json',
      //   parser: {
      //     parse: toml.parse,
      //   },
      // },
      // {
      //   test: /\.yaml$/i,
      //   type: 'json',
      //   parser: {
      //     parse: yaml.parse,
      //   },
      // },
      // {
      //   test: /\.json5$/i,
      //   type: 'json',
      //   parser: {
      //     parse: json5.parse,
      //   },
      // },
    ]
  }
};