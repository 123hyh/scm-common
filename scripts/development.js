/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 15:33:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:03:35
 * @Description: 
 * @FilePath: \scm_frontend_common\scripts\development.js
 */
const path = require('path')
const webpack  = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = dir => path.resolve(process.cwd(), dir)

module.exports = {
  entry: {
    index:resolve('./src/index.ts'),
    utils: resolve('./src/utils/index.ts'),
    filters: resolve('./src/filters/index.ts'),
    directives: resolve('./src/directives/index.ts'),
    'vue-component': resolve('./src/vue-component/index.ts')
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
   /*  library: 'scmCommon',
    libraryTarget: 'var',
    umdNamedDefine: true */
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
        test: /\.(js|ts|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: "pre",
        options: {
          fix: true
        },
      },
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ]
}