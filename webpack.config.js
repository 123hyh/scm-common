/*
 * @Author: your name
 * @Date: 2020-11-30 22:45:15
 * @LastEditTime: 2020-12-02 19:11:26
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\webpack.config.js
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/main.js')
  },
  mode: 'production',
  devtool:'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve (__dirname,'./dist'),
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
  plugins:[
    new HtmlWebpackPlugin()
  ]
}