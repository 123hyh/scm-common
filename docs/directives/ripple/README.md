<!--
 * @Author: huangyuhui
 * @Date: 2021-01-21 11:27:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-21 11:39:58
 * @Description: 
 * @FilePath: \scm_frontend_common\docs\directives\ripple\README.md
-->
# 水波纹指令

```js 
import {
  /* 指令 */ 
  ripple,
  } from 'scm-common/src/directives';
```
::: tip
  该指令绑定在元素上
:::


- ## modifiers:
----- 

| 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| event | string | 否 | - | 触发事件 |
| transition | number | 否 | - | 动画事件 |


- ## value: 水波纹颜色

```js
  v-ripple.mouseover.500="'rgba(255, 255, 255, 0.35)'"
```