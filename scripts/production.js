/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 15:36:30
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-03 15:40:19
 * @Description: 
 * @FilePath: \scm_frontend_common\scripts\production.js
 */
const path = require('path')
const resolve = dir => path.resolve(process.cwd(), dir)

module.exports = {
  entry: {
    utils: resolve('./src/utils/index.ts'),
    filters: resolve('./src/filters/index.ts'),
    directives: resolve('./src/directives/index.ts'),
    'vue-component': resolve('./src/vue-component/index.ts')
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
    library: 'scmCommon',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
}