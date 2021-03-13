<!--
 * @Author: huangyuhui
 * @Date: 2020-09-27 18:38:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-13 14:06:25
 * @Description:
 * @FilePath: \scm_frontend_common\docs\commonComponent\form\README.md
-->

# 缓存组件 (改写 keep-alive)

### 解决使用 key 时，可清空 对应 key 的 cache

```javascript
import AKeepAlive from "scm-common/src/vue-component/KeepAlive";
```

- ## Props：

  | 属性名                  | 类型                      | 是否必传 | 默认值 | 备注                         |
  | ----------------------- | ------------------------- | -------- | ------ | ---------------------------- |
  | ...原生 KeepAlive props | object                    | -        | -      |                              |
  | excludeKeys             | [ String, RegExp, Array ] | -        | -      | 排除 key 的组件缓存          |
  | clearCaches             | Array                     | -        | -      | 需要清楚缓存组件 key 的 集合 |

---

- ## Event：

  | 事件名 | 回调参数 | 备注                   |
  | ------ | -------- | ---------------------- |
  | clear  | -        | 清空缓存 key 后的 事件 |

---

- ## demo:

  ```vue
  <template>
    <div>
      <AKeepAlive :clearCaches="clearCaches" @clear="handlerClear">
        <component :key="..."></component>
      </AKeepAlive>
    </div>
  </template>
  <script>

  import AKeepAlive，{ getCacheKey } from 'scm-common/src/vue-component/KeepAlive'

  export default {
    components: {
      AKeepAlive
    },
    data(){
      return {
        clearCaches:[]
      }
    },
    methods: {
      /**
      * 清空缓存后的事件
      **/
     handlerClear(){

     },
      /**
      * 获取某个组件 的 key
      **/
     getCacheKey(){
       return  getCacheKey(/* vue实例 */)
     }
    }
  }
  </script>
  ```

::: warning
1、如果要清空的 key 对应的组件是当前 active 的组件，先切换到别的组件 在进行清除 当前的 key;否则 会导致重复 该组件之后在创建不会被缓存
:::
::: warning
2、获取 组件的 key 请使用 getCacheKey  ( 确保key 对应 keepalive 中的 key )
:::