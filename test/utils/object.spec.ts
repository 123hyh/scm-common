/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 15:44:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:24:20
 * @Description: 
 * @FilePath: \scm_frontend_common\test\utils\object.spec.ts
 */
import { camelCaseKeys, forEachObject } from "@/utils/index.ts";

test("测试 object key to camelCase", () => {
  /* 数组 => deep */
  expect(
    camelCaseKeys([{ x: { x_y: 1 } }], { deep: true })
  ).toEqual([{ x: { xY: 1 } }]);
  /* 数组 => 无deep */
  expect(
    camelCaseKeys([{ x_y_m: { x_y: 1 } }])
  ).toEqual([{ xYM: { x_y: 1 } }]);

  /* 对象 */
  expect(
    camelCaseKeys({ x_y: { x_y: 1 } }, { deep: true })
  ).toEqual({ xY: { xY: 1 } })
});

test('测试 遍历 object', () => {
  expect(
    forEachObject({ x: { x: 1 }, y: 1 }, (key, value) => {
      return { [key]: [value] }
    })
  ).toEqual({ x: [{ x: 1 }], y: [1] })
})