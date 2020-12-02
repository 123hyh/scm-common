/*
 * @Author: your name
 * @Date: 2020-12-03 00:14:23
 * @LastEditTime: 2020-12-03 00:41:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\table\index.ts
 */
import './index.scss'
import { CreateElement } from 'vue'

export default {
  render(h: CreateElement) {
    h('div', {
      class: 'table'
    })
  }
}