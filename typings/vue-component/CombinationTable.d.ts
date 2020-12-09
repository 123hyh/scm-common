/*
 * @Author: your name
 * @Date: 2020-12-05 18:06:03
 * @LastEditTime: 2020-12-09 14:20:19
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\typings\vue-component\CombinationTable.d.ts
 */

import { ComponentOptions } from 'vue'
import { TableSchema } from './tableSchema'

type CombinationTableType = ComponentOptions<{
  props: {
    queryBarSchema: object[],
    tableSchema: TableSchema,
    total: number,
    list: object[],
    entityName: string
  }
}> & {
  /* 暴露组件 */
  QueryBar: ComponentOptions<{}>,
  BaseTable: ComponentOptions<{}>,
  Pagination: ComponentOptions<{}>,
}
export const CombinationTable: CombinationTableType