/*
 * @Author: your name
 * @Date: 2021-03-18 15:29:15
 * @LastEditTime: 2021-03-18 15:31:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm-common\test\filters\number.spec.ts
 */
import {amountToUpperCase} from '@/filters/number/index'

test('金额转大写汉字',()=>{
    expect(amountToUpperCase(1111.11)).toBe('壹仟壹佰壹拾壹元壹角壹分')
})