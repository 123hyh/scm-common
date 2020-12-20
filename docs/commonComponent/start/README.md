<!--
 * @Author: huangyuhui
 * @Date: 2020-12-15 14:05:00
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 14:11:28
 * @Description:
 * @FilePath: \scm_frontend_common\docs\commonComponent\start\README.md
-->

# 开始

## 1、使用 scm 组件库

```js
import { useScmComponent } from "scm-common/src/vue-component";

useScmComponent({
  /* 组件尺寸 'medium' | 'small' | 'mini' */
  size: 'small',
  /* 码值方法（表单item 如添加 dict 则需要注册） */
  dictRequest: () => Promise<any>
})
```
