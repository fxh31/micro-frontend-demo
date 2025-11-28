const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),
    //   vue: 'vue/dist/vue.esm-bundler.js',
    // },
    // extensions: ['.js', '.json', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer'), // 使用 autoprefixer 插件
              ]
            }
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/images/[name].[contenthash:8][ext]', // 输出目录和文件名格式
        }
      }
    ]
  }
}