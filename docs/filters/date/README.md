<!--
 * @Author: your name
 * @Date: 2020-12-14 23:04:54
 * @LastEditTime: 2020-12-14 23:09:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/docs/filters/date/README.md
-->

# 日期时间转换

```js {2}
import { formatDate } from 'scm-common/src/filters';

/**
 * 日期时间格式化
 * {{ Date() | formatDate }} -> 2020-09-28 15:54:52
 * {{ '2020/11/06 12:30:45' | formatDate('yyyy-MM-dd hh:mm:ss w') }} -> 2020-11-06 12:30:45 星期四
 * @param {Date} value 可以被 new Date(value) 解析的时间格式，如 Date()、2020/11/06、2020-11-06 12:00 等
 * @param {String} fmt 格式化模版
 */
formatDate('2013-01-12 12:10:01','yyyy-MM-dd') // => 2013-01-12
/* 转换日期 */
formatDate('2013-01-12 12:10:01','yyyy/MM/dd') // => 2013/01/12
/* 季度 */
formatDate('2013-01-12 12:10:01','q') // => 1
/* 季度 */
formatDate('2013-01-12 12:10:01','MM') // => 01
...
```
