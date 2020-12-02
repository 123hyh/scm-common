/*
 * @Author: your name
 * @Date: 2020-11-30 22:45:15
 * @LastEditTime: 2020-12-02 19:52:11
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\webpack.config.library.js
 */
const path = require('path')

module.exports = {
  entry: {
    utils: path.resolve(__dirname, './src/utils/index.ts'),
    filters: path.resolve(__dirname, './src/filters/index.ts'),
    directives: path.resolve(__dirname, './src/directives/index.ts')
  },
  mode: 'production',
  devtool:'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve (__dirname,'./dist'),
    library:'scmCommon',
    libraryTarget:'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { 
            loader: 'babel-loader' 
          }
        ],
        include: [path.resolve(__dirname, './src')]
      },
      {
        test: /\.ts$/,
        use:[
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
 
}