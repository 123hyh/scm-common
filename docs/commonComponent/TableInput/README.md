<!--
 * @Author: your name
 * @Date: 2020-12-27 23:10:54
 * @LastEditTime: 2020-12-27 23:42:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\docs\commonComponent\TableInput\README.md
-->
# 表格输入组件
```js
  import TableInput from 'scm-common/src/vue-component/TableInput/index.js'
```
 - ## Props：

    | 属性名 | 类型 | 是否必传 | 默认值 | 备注 |  
    ------------ | ------------- | -------------| -------------| -------------
    | schema | object[][] | 是 | - | 表格输入的配置 |
    | formData | object | 是 | - | 表单数据集合 |
    | collector | object | 否 | - | 校验收集器（如需校验请使用传入） |

 - ##  Slot：

  |  名称  | 参数  |  备注  |
  | ------------ | ------------ | ------------ |
  | [ field ] | - | 字段插槽（需要在schemaItem 中设置 type='slot'） |

```vue 
<template>
  <TableInput
    :schema="schema"
    :collector="collector"
    >
      <!-- 字段插槽 -->
    <template #age>
      <input type="text">
    </template>
  </TableInput>
</template>

<script>
import TableInput from 'scm-common/src/vue-component/TableInput/index.js';
import { useCollertor } from 'scm-common/src/vue-component/Form/FormValidate/directive';
import { isEmpty } from 'scm-common/src/utils';
export default {
  components: {
    TableInput
  },
  data: () => ( {
    /**
     * 收集器
     * */
    collector: useCollertor(),
    schema: [
      [
        {
          type: 'label',
          label: '姓名',
          /**
           * 列合并
           * */
          colspan: 5,
          /**
           * 行合并
           * */
          rowspan: 2
        },
        {
          type: 'string',
          field: 'customerName',
          /**
           * 校验规则
           * */
          rules: {
            required: true,
            length: { min: 3, max: 4 },
            use: {
              checkInt( v ) {
                const isPass = isEmpty( v ) || /^[0-9]+$/.test( v );
                return isPass;
              }
            },
            message: {
              length: '长度3-4',
              checkInt: '必需整数',
              required: '必填'
            }
          }
        },
        {
          type: 'label',
          label: '年龄'
        },
        {
          type: 'slot',
          field: 'age'
        },
        {
          type: 'label',
          label: '性别'
        },
        {
          type: 'select',
          field:'sex'
          options: [
            {
              value: 0,
              label: '女'
            },
            {
              label: '男',
              value: 1
            }
          ]
        },
        {
          type: 'checkbox',
          field:'hobby',
          options: [
            {
              value: 0,
              label: '打游戏'
            },
            {
              label: '放牛',
              value: 1
            }
          ]
        },
        {
          type: 'radio',
          field:'habits',
          options: [
            {
              value: 0,
              label: '打游戏'
            },
            {
              label: '放牛',
              value: 1
            }
          ]
        },
        {
          type: 'date',
          dateType:'daterange',
          valueFormat:'yyyy-MM-dd'
          field:'habits_2',
        },
      ]
    ]
  } )
};
</script>
```