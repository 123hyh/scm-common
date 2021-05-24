/*
 * @Author: your name
 * @Date: 2020-11-29 22:12:31
 * @LastEditTime: 2021-05-24 17:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\formSchema.d.ts
 */
import {RuleItem} from 'async-validator'
type DateValueType = 'yyyy' | 'M' | 'MM' | 'W' | 'WW' | 'd' | 'dd' | 'H' | 'HH' | 'h' | 'hh' | 'm' | 'mm' | 's' | 'ss' | 'A' | 'a' | 'timestamp'


type SelectType = {
  /* 下拉值 */
  options?: Array<{ label: string, value: any, disabled?: boolean }>,
  /* 字典值 */
  dict?: string,
  /* 过滤 options   */
  filterOptions?: (keys: any[]) => any,
}
type DateType = {
  /* 当type = date */
  dateType?: 'year' | 'month' | 'date' | 'week' | 'datetime' | 'datetimerange' | 'daterange',
  valueFormat?: DateValueType,
  format?: DateValueType,
}

export declare type FormSchema = {
  [prop: string]: SelectType & DateType & {
    type: 'string' | 'select' | 'checkbox' | 'radio' | 'switch' | 'date' | 'textarea' | 'object' | 'slot',
    tip?: string,
    label?: string,
    clearable?: boolean,
    disabled?:boolean,
    visible?: boolean,
    card?: boolean,
    rules?: RuleItem[],
    /**
     * 表单组件 element 事件
     */
    customEvent:{ [prop: string]: (...args: any[]) => void}
    properties?: { [prop: string]: FormSchema }
  }
} 