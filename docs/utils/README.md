<!--
 * @Author: your name
 * @Date: 2020-12-14 22:40:53
 * @LastEditTime: 2020-12-14 23:36:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/docs/uilts/README.md
-->

# 工具函数:


  ## 1、下划线 => 驼峰(仅限数组和对象)  
  ```js
  import { camelCaseKeys } from 'scm-common/src/utils';

  /* 对象 深度转 */
  camelCaseKeys({ x_y: { x_y: 1 } }, { deep: true }); // => { xY: { xY: 1 } }
  /* 数组 */
  camelCaseKeys([{ x_y: 1 }], { deep: true }); // => [{ xY: 1 }]
  ```

  ## 2、遍历对象
  forEachObject( data, callback )
    参数：  
    1、`data` ( Object ) 遍历源对象  
    2、`callback` ( function ) 遍历回调  
    返回值：callback 返回的集合  
  ```js
  import { forEachObject } from 'scm-common/src/utils'

  const newObj = forEachObject(
    {
      counter: 1,
    },
    (key, value) => {
      return { [key]: (value += 1) };
    }
  );
  ```

  ## 3、判断是否为空

```js
import { isEmpty } from 'scm-common/src/utils'

isEmpty(NaN); // => true
isEmpty(''); // => true
isEmpty(undefined); // => true
isEmpty(null); // => true
isEmpty(0); // => false
```
