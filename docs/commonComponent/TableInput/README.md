<!--
 * @Author: your name
 * @Date: 2020-12-27 23:10:54
 * @LastEditTime: 2021-07-08 17:04:25
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
    :formData="formData"
    >
      <!-- 字段插槽 -->
    <template #age>
      <input type="text">
    </template>
    
      <!-- 字段插槽 - 自定义校验 -->
    <template #xxx="_schema">
      <input v-validate="{
        collector: collector,
        field: _schema.field,
        data: formData.xxx,
        rules:{
          required: true,
          message:'必填'
        }
      }" 
      type="text">
    </template>
    
  </TableInput>
</template>

<script>
import TableInput from 'scm-common/src/vue-component/TableInput/index.js';
import { useCollector,validate } from 'scm-common/src/vue-component/Form/FormValidate/directive';
import { isEmpty } from 'scm-common/src/utils';
export default {
  components: {
    TableInput
  },
  directives: {
    /* 校验指令 */
    validate
  },
  mounted(){
    this.handlerValidate()
  },
  methods:{
    /**
     * 校验 表格输入组件 的所有数据
     * @description: 
     * @param {*}
     * @return {*}
     */
    async handlerValidate() {
      const x = await this.collector.validate();
    },
  },
  data: () => ( {
    formData: {
      xxx: 1
    },
    /**
     * 收集器
     * */
    collector: useCollector(),
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
          rowspan: 2,
          /**
           * 单元格样式名称
           * */
          tdClassName: 'className'
        },
        {
          type: 'string',
          /**
           * 字段名 - 对应表单字段
           **/
          field: 'customerName',
          /**
           * 该选项 为 type 属性所对应的 组件中的 事件(可查看 element-ui 的组件事件)
           **/
          customEvent:{
            input:(v)=>{
              ....
            }
          },
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