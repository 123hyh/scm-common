/*
 * @Author: your name
 * @Date: 2020-11-30 22:45:15
 * @LastEditTime: 2020-12-03 00:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\webpack.config.library.js
 */
const path = require('path')
const webpack  = require('webpack')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: {
    utils: resolve('./src/utils/index.ts'),
    filters: resolve('./src/filters/index.ts'),
    directives: resolve('./src/directives/index.ts'),
    'vue-component': resolve('./src/vue-component/index.ts')
  },
  // mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
    library: 'scmCommon',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: resolve('./dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: '9000',
    host: '0.0.0.0',
    hot: true,
    compress: true
  },
  externals: ['vue'],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve('./src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [resolve('./src')]
      },
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          'postcss-loader'
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          'postcss-loader'
        ],
      },
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}