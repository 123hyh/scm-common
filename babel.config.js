/*
 * @Author: your name
 * @Date: 2020-12-01 21:55:01
 * @LastEditTime: 2020-12-08 23:36:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\babel.config.js
 */
const {development} = require('yargs').argv
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  plugins: [
    development && [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ].filter(Boolean)
}