const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist-lib'),
    filename: 'webpack-numbers.js',
    // <script src="https://example.org/webpack-numbers.js"></script>
    // <script>
    //   window.webpackNumbers.wordToNum('Five');
    // </script>
    library: {
      name: 'webpackNumbers',
      type: 'umd'
    },
    // library: {
    //   type: 'module'
    // }, // es module 模式打包
    clean: true
  },
  // experiments: {
  //   outputModule: true // 启用实验性的 ES Module 输出支持
  // },
  externals: {
    // 将 lodash 作为 peerDependency，由使用者从外部控制
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash', 
      module: 'lodash', // es module
      root: '_',
     },
  },
  // // 从一个依赖中调用多个文件，需要逐个或者使用正则表达式排除它们
  // externals: [
  //   'library/one',
  //   'library/two',
  //   // 匹配以 "library/" 开始的所有依赖
  //   /^library\/.+$/,
  // ],
};