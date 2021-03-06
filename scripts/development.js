/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 15:33:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 23:25:57
 * @Description: 
 * @FilePath: \scm_frontend_common\scripts\development.js
 */
const path = require('path')
const webpack  = require('webpack')
const webpackDevServer  = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = dir => path.resolve(process.cwd(), dir)
const vueOptionsMerge = require('./vue.options')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devOptions =  vueOptionsMerge( {
  entry: {
    index:resolve('./src/index.ts'),
    utils: resolve('./src/utils/index.ts'),
    filters: resolve('./src/filters/index.ts'),
    directives: resolve('./src/directives/index.ts'),
    'vue-component': resolve('./src/vue-component/index.ts'),
    'example': resolve('./src/example/index.js')
  },
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
    publicPath:'/',

  },
  devServer: {
    publicPath: '/',
    port: '9000',
    host: '0.0.0.0',
    progress:true,
    quiet: true,
    hot: true,
    compress: true,
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
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
        exclude: [/node_modules/,/hiprint.bundle/],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack App',
      template: resolve('./src/example/index.html'),
      chunks: ['example']
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`您的应用程序正在这里运行:  http://localhost:${9000}\n`],
      },
    }),
  ]
})

const devServer = new webpackDevServer(webpack(devOptions) ,devOptions.devServer)

devServer.listen(devOptions.devServer.port,'0.0.0.0',(error)=>{
  console.log(error ?? '')
})