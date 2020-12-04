/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 16:40:30
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:49:41
 * @Description: 
 * @FilePath: \scm_frontend_common\test\filters\index.spec.ts
 */
import { booleanToText } from '@/filters/index'

test('测试 booleanToText ', () => {
  expect(booleanToText(true)).toBe('是')
  expect(booleanToText(false)).toBe('否')
  expect(booleanToText()).toBe('否')
  expect(booleanToText(1)).toBe('是')
  expect(booleanToText(0)).toBe('否')
  expect(booleanToText(2)).toBe('是')
  expect(booleanToText(2,'en')).toBe('Yes')
  expect(booleanToText(0,'en')).toBe('No')
  expect(booleanToText(true,'en')).toBe('Yes')
  expect(booleanToText(false,'en')).toBe('No')
  expect(booleanToText(undefined,'en')).toBe('No')
  expect(booleanToText(null,'en')).toBe('No')
  expect(booleanToText('','en')).toBe('No')
  expect(booleanToText(NaN,'en')).toBe('No')
  expect(booleanToText(Infinity,'en')).toBe('Yes')
})