/*
 * @Author: your name
 * @Date: 2020-12-05 13:14:26
 * @LastEditTime: 2020-12-05 14:06:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\scripts\vue.options.js
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { merge } = require('webpack-merge')
module.exports = (options) => merge(options, {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
        /* {
          test: /\.css$/i,
          use: [
            'vue-style-loader', 
            'css-loader',
            'postcss-loader'
          ]
        }, */
      {
        test: /\.s[as]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
    ]
  },

  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}) 