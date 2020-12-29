/*
 * @Author: your name
 * @Date: 2020-12-24 23:36:48
 * @LastEditTime: 2020-12-29 14:49:58
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\index.d.ts
 */

import { Collector } from "../Form/FormValidate/collector"

/**
 * 查找 tableInput Schema 的 字段
 * @description: 
 * @param { string[] } fields 需要查找的字段集合
 * @param { object[][] } tableInputSchema 表格输入组件的schema
 * @return {*}
 */
export declare const pickTableInputSchemaItem: (
  fields: string[],
  tableInputSchema: object[][]
) => { [prop: string]: object }

/**
 * 挑选 表格输入schemaItem 自行判断方法
 * @param {function} conditionFn 条件回调，每次传入item
 * @param {object[][]} tableInputSchema  表格输入schema
 */
export declare const selfPickTableInputSchemaItem: (
  conditionFn: (schemaItem: object) => boolean,
  tableInputSchema: object[][]
) => { [prop: string]: object }
declare const TableInput: {
  props: {
    /**
     * 表格schema
     */
    schema: object[][],
    /**
     * 表格输入数据集合
     */
    formData: object,
    /**
     * 校验收集器
     */
    collector: Collector
  }
}

export default TableInput