/*
 * @Author: huangyuhui
 * @Date: 2020-12-08 15:05:37
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 15:14:21
 * @Description: 
 * @FilePath: \scm_frontend_common\typings\vue-component\tabs.d.ts
 */
import { ComponentOptions } from 'vue'

type ScmTabsType = ComponentOptions<{
  props: {
    list: Array<{
      label: string,
      path: string,
      disabled?: boolean,
      reg: RegExp
    }>
  }
}>

export const ScmTabs: ScmTabsType