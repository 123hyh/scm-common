/*
 * @Author: your name
 * @Date: 2020-12-05 18:06:03
 * @LastEditTime: 2020-12-09 14:27:26
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\typings\vue-component\CombinationTable.d.ts
 */

import { AnyObject } from 'typings/utils'
import { TableSchema } from './tableSchema'

type CombinationTableType = {
  props: {
    queryBarSchema: object[],
    tableSchema: TableSchema,
    total: number,
    list: object[],
    entityName: string
  }
} & {
  /* 暴露组件 */
  QueryBar: AnyObject,
  BaseTable: AnyObject,
  Pagination: AnyObject,
}
export const CombinationTable: CombinationTableType