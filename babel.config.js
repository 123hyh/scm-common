/*
 * @Author: your name
 * @Date: 2020-12-01 21:55:01
 * @LastEditTime: 2020-12-01 22:16:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testwebpack\.babel.config.js
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}