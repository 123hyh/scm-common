/*
 * @Author: your name
 * @Date: 2020-12-05 18:06:03
 * @LastEditTime: 2020-12-05 18:15:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Table\CombinationTable.d.ts
 */

import {ComponentOptions} from 'vue'
import { TableSchema } from './tableSchema'

type CombinationTable = ComponentOptions<{
  props:{
    queryBarSchema: object[],
    tableSchema: TableSchema,
    total: number,
    list: object[],
    entityName: string
  }
}>
export default CombinationTable