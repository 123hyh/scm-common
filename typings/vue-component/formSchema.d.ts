/*
 * @Author: your name
 * @Date: 2020-11-29 22:12:31
 * @LastEditTime: 2020-12-09 13:56:16
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\typings\vue-component\formSchema.d.ts
 */
import {RuleItem} from 'async-validator'
type DateValueType = string;/* 'yyyy' | 'M' | 'MM' | 'W' | 'WW' | 'd' | 'dd' | 'H' | 'HH' | 'h' | 'hh' | 'm' | 'mm' | 's' | 'ss' | 'A' | 'a' | 'timestamp' */

export type OptionsItem = { label: string, value: any }
export  type OptionsType = Array<OptionsItem>

export  type SelectType = {
  /* 下拉值 */
  options?: Array<{ label: string, value: any, disabled?: boolean }>,
  /* 字典值 */
  dict?: string,
  /* 多选 */
  multiple?:boolean,
  /* 过滤 options   */
  filterOptions?: (options: OptionsType ) => OptionsType,
}
type DateType = {
  /* 当type = date */
  dateType?: 'year' | 'month' | 'date' | 'week' | 'datetime' | 'datetimerange' | 'daterange',
  valueFormat?: DateValueType,
  format?: DateValueType
}

export declare type FormSchema = {
  [prop: string]: SelectType & DateType & {
    type?: 'string' | 'select' | 'checkbox' | 'radio' | 'switch' | 'date' | 'textarea' | 'object' | 'slot',
    tip?: string,
    label?: string,
    clearable?: boolean,
    disabled?:boolean,
    visible?: boolean,
    card?: boolean,
    rules?: RuleItem[],
    properties?: FormSchema
  }
} 