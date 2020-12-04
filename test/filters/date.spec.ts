/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 15:42:13
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 15:58:09
 * @Description: 
 * @FilePath: \scm_frontend_common\test\filters\date.spec.ts
 */
import { formatDate } from '@/filters/index.ts'
test('test filters date', () => {
  var date = new Date('1993-09-01 21:30:21')

  expect(
    formatDate(date, 'yyyy/MM/dd hh:mm:ss')
  ).toBe('1993/09/01 21:30:21')
  expect(
    formatDate(date, 'yyyy/MM/dd')
  ).toBe('1993/09/01')
  expect(
    formatDate(date, 'yyyy/q/dd')
  ).toBe('1993/3/01')
  expect(
    formatDate(date, 'yyyy/q/w')
  ).toBe('1993/3/星期三')
  expect(
    formatDate(date, 'yyyy')
  ).toBe('1993')
  expect(
    formatDate(date, 'q')
  ).toBe('3')
  expect(
    formatDate(date, 'w')
  ).toBe('星期三')
  expect(
    formatDate(date, 'MM')
  ).toBe('09')
  expect(
    formatDate(date, 'dd')
  ).toBe('01')
  expect(
    formatDate(date, 'hh')
  ).toBe('21')
  expect(
    formatDate(date, 'mm')
  ).toBe('30')
  expect(
    formatDate(date, 'ss')
  ).toBe('21')

  expect(
    formatDate('', 'ss')
  ).toBe('')
})