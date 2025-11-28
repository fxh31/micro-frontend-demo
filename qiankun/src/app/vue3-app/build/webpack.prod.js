// build > webpack.prod.js
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 打包分析报告
// const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 显示打包进度
const packageName = require('./package.json').name; // qiankun 微应用暴露给主应用名称

const ENV = process.env.NODE_ENV
console.log('运行环境：' + ENV)

function getPlugins() {
  const plugins = [
    // new ProgressBarPlugin({
    //   format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`
    // })
  ]

  if (ENV === 'test') {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 生成静态报告
      openAnalyzer: true,
    }))
  }

  return plugins
}

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: getPlugins(),
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          chunks: 'all',
          minChunks: 1,
          minSize: 0
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 0,
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 2,
          minSize: 0
        }
      }
    },
  },
  // cache: 'filesystem', // 添加缓存文件
})
