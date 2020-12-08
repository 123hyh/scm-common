/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 15:36:30
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 15:41:17
 * @Description: 
 * @FilePath: \scm_frontend_common\scripts\production.js
 */
const path = require('path')
const resolve = dir => path.resolve(process.cwd(), dir)
const { analyzer = false } = require('yargs').argv
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const ProductionOption = {
  entry: {
    "index": [
      resolve('./src/utils/index.ts'),
      resolve('./src/filters/index.ts'),
      resolve('./src/directives/index.ts'),
      resolve('./src/vue-component/index.ts')
    ]
  },
  mode: 'production',
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
        test: /\.(ttf|eot|svg|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
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
  plugins: [
    analyzer && new BundleAnalyzerPlugin(),
  new ProgressBarPlugin(),
  ].filter(Boolean),
}

const Webpack = require('webpack');
const compile = Webpack(ProductionOption);
compile.run((err, stats) => {
  if (err || stats.compilation.errors.length) {
    console.log('错误信息: ', err, stats.compilation.errors);
  } else {
  }
});
