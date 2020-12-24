/*
 * @Author: your name
 * @Date: 2020-12-24 23:36:48
 * @LastEditTime: 2020-12-24 23:42:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\index.d.ts
 */

/**
* 查找 tableInput Schema 的 字段
* @description:
* @param {*}
* @return {*}
*/
export declare const pickTableInputSchemaItem: (
  fields: string[], tableInputSchema: object[]
) => { [prop: string]: object }

declare const TableInput:{
  props:{
    /**
     * 表格schema
     */
    schema: object[][],
    /**
     * 表格输入数据集合
     */
    formData: object
  }
}
export default pickTableInputSchemaItem