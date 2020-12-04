/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 15:43:00
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 15:43:10
 * @Description: 
 * @FilePath: \scm_frontend_common\test\filters\ratio.spec.ts
 */
import { numberToRatio, ratioToNumber } from '@/filters/index.ts'

test('test filters numberToRatio', () => {
  const t = numberToRatio(100)
  expect(
    t(0.1123)
  ).toBe(11.23)

  expect(
    t(0.14)
  ).toBe(14)

  expect(
    t(1.1)
  ).toBe(110)

  expect(
    t('')
  ).toBe('')

  const d = numberToRatio(1000)
  expect(
    d(0.1123)
  ).toBe(112.3)
})

test('test filters ratioToNumber', () => {
  const d = ratioToNumber(100)
  expect(
    d(100)
  ).toBe(1)

  expect(
    d(14)
  ).toBe(0.14)

  expect(
    d(11.34)
  ).toBe(0.1134)

  const t = ratioToNumber(1000)
  expect(
    t(100)
  ).toBe(0.1)

  expect(
    t(14)
  ).toBe(0.014)

  expect(
    t(11.34)
  ).toBe(0.01134)
  
  expect(
    t('')
  ).toBe('')
})

