/*
 * @Author: huangyuhui
 * @Date: 2020-12-08 10:17:23
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 10:19:09
 * @Description: 
 * @FilePath: \scm_frontend_common\typings\scm-vue-component\RouterView.d.ts
 */

import { AnyObject } from "typings/utils";

type RouterViewWrap = (componentName: string,
  keepAlive: { exclude: string[] } | boolean = true) => AnyObject

export const routerView: RouterViewWrap