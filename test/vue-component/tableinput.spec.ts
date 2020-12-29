/*
 * @Author: huangyuhui
 * @Date: 2020-12-29 14:51:20
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-29 15:10:03
 * @Description: 
 * @FilePath: \scm_frontend_common\test\vue-component\tableinput.spec.ts
 */

import { selfPickTableInputSchemaItem, pickTableInputSchemaItem } from '@/vue-component/TableInput/utils'
const baseSchema = [
  [
    {
      field: 'name',
    },
    {
      field: 'age'
    }
  ],
  [
    {
      field: 'test'
    }
  ]
]
test('pickTableInputSchemaItem', () => {
  expect(pickTableInputSchemaItem(['name', 'test'], baseSchema)).toEqual({
    name: {
      field: 'name',
    },
    test: {
      field: 'test'
    }
  })
})
test('selfPickTableInputSchemaItem', () => {
  expect(selfPickTableInputSchemaItem(
    ({ field }={}) => {
    return field === 'name' || field ==='age'
  },baseSchema)
  ).toEqual({
    name:{
      field: 'name',
    },
    age:{
      field: 'age'
    }
  })
})
