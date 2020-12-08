/*
 * @Author: huangyuhui
 * @Date: 2020-12-08 11:12:30
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 11:12:30
 * @Description: 
 * @FilePath: \scm_frontend_common\typings\utils\index.d.ts
 */
/**
 * 下划线转驼峰
 * @example {x_y: 1} => {xY: 1}
 * @description: 
 * @param {*}
 * @return {*}
 */
export const camelCaseKeys: (
  t: object | object[],
  options?: { deep?: boolean }
) => any;

type AnyObject = {
  [prop:string]:any
}

export const forEachObject = (
  objectData: AnyObject,
  handler: (key: string, valuue: any) => AnyObject
) => AnyObject;
