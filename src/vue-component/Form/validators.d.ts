/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 13:58:44
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-28 11:42:27
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\Form\validators.d.ts
 */
import { Rules, ValidateSource, ValidateOption } from 'async-validator'

type validator = (
  rule: Rules,
  value: any,
  callback: (error: string | string[] | void) => void,
  source?: ValidateSource,
  options?: ValidateOption,
) => void;

/**
 * 校验整数类型表单值
 * @description:
 * @param {*}
 */
export declare const checkInteger: () => validator

/**
 * 校验整数或者小数
 * @description:
 * @param {number} decimal 保留小数的位数(默认两位小数)
 * @return {*}
 */

export declare const checkIntegerDecimal: (decimal = 2) => validator

/**
 * 小数正则表达式
 */
export declare const decimalRegExp: (decimal = 2) => RegExp

/**
 * 整数正则表达式
 */
export declare const integerRegExp: () => RegExp