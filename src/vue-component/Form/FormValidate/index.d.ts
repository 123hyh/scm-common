/*
 * @Author: your name
 * @Date: 2020-12-27 01:02:00
 * @LastEditTime: 2020-12-27 01:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\FormValidate\index.d.ts
 */
import { Collector } from './collector'
import { Rule, RuleArray } from 'validate'
const FormValidate: {
  props: {
    /**
     * 需要校验的字段名
     */
    field: string,
    /**
     * 收集器
     */
    collector: Collector,
    /**
     * 校验规则( 参考 validate库 )
     */
    rules: Rule | RuleArray,
    /**
     * 需要校验的值
     */
    value: any
  }
}
export default FormValidate