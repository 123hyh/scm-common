/*
 * @Author: your name
 * @Date: 2020-12-01 21:55:01
 * @LastEditTime: 2020-12-04 13:41:25
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\babel.config.js
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
  ],
}