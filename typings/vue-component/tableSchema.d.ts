/*
 * @Author: huangyuhui
 * @Date: 2020-11-30 16:21:17
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 11:54:44
 * @Description: 表格 schema 类型
 * @FilePath: \scm_frontend_common\typings\vue-component\tableSchema.d.ts
 */
type generalType = {
  width?: string | number,
  align?: 'left' | 'center' | 'right',
  visible?: boolean,
  label?: string,

}
type ColumnType = generalType & {
  field: string,
  sortable?: boolean,
  tip?: string,
  children?: ColumnType[]
}

export declare type TableSchema = {
  index?: generalType,
  operation?: generalType,
  selection?: generalType & {
    isMultiple?: boolean
  },
  column: ColumnType[]
}