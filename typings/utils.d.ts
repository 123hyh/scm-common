/*
 * @Author: your name
 * @Date: 2020-12-07 23:29:00
 * @LastEditTime: 2020-12-07 23:34:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/typings/utils.d.ts
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
