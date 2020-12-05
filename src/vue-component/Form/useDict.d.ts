/*
 * @Author: your name
 * @Date: 2020-11-29 20:18:20
 * @LastEditTime: 2020-11-29 20:47:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs\src\components\common\Form\useDict.d.ts
 */

/**
 * 远程获取 dict 并设置表单
 * @description: 
 * @param {*}
 * @return {*}
 */
export declare const setDictValue: (dicts:string[], dictValues:{[prop:string]:any})=>any;

/**
 * 挑选 schema 码值
 * @description: 
 * @param {} schema 表单schema
 * @return {*}
 */
export declare const pickDict: (schema: { [prop: string]: any }) => Array<string>;

/**
 * 获取表单schema中 字典的键值对
 * @description: 
 * @param {*} schema 表单schema
 */
export declare const getDictSchemaItem: (
  schema: { [prop: string]: any }
) => Array<{ [prop: string]: any }>;

/**
 * 过滤码值方法
 * @description:
 * @param { Array<string | number | boolean> } keys 需要 过滤掉的值集合
 * @return { Array<{label: string, value: any}> }
 */
export declare const filterOptions: (
  keys: Array<string | number | boolean>
) => () => any[];