<!--
 * @Author: your name
 * @Date: 2020-12-14 22:43:56
 * @LastEditTime: 2020-12-14 23:04:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/docs/filters/radio/README.md
-->

```js {2,3}
import { numberToRatio, ratioToNumber } from 'scm-common/src/filters';
```

## 1、 数字 转换 率

```js
/**
 * 百分比 / 千分比
 * @param { number } radix  基数
 * @return { function }
 * @exmaple 13 => 0.13
 * 
 **/
const transformNumber = numberToRatio(
  /* radix */
  100
);
transformNumber(13); // to => 0.13
```

## 2、 率 转 数字

```js
/**
 *
 * @param { number } radix  基数
 * @exmaple 0.13 => 13
 * @return { function }
 *
 * */
const transformNumber = ratioToNumber(
  /* radix */
  100
);
transformNumber(0.13); // to => 13
```
