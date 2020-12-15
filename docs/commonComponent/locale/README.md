<!--
 * @Author: huangyuhui
 * @Date: 2020-12-15 13:57:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 14:02:59
 * @Description:
 * @FilePath: \scm_frontend_common\docs\commonComponent\locale\README.md
-->

# 组件国际化

```js
import en from "scm-common/src/locale/en";
import zh from "scm-common/src/locale/zh";

import { useLocale } from "scm-common/src/locale";
/**
 *
 * @param { object } message 18n 参数
 * @param { function }  回调，可修改值
 * */
useLocale(
  /* message  */
  en,
  /* 回调 */
  (key, value) => {
    return value;
  }
);
```
