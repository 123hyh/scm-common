<!--
 * @Author: huangyuhui
 * @Date: 2020-09-29 09:55:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-29 11:19:48
 * @Description: 
 * @FilePath: \SCM 2.0\docs\commonComponent\queryBar\README.md
-->
# 查询栏 schema 配置

   ```javascript 
   
      import BaseTable from '@/components/common/QueryBar'

   ```

  - ## Props:
    | 属性名| 类型 | 是否必传 | 默认值 | 备注 |
      | ------------ | ------------ | ------------ | ------------ | ------------ |
      | schema | object | 是 | - | 查询栏表单参数 | 


    | 属性名| 类型 | 值 | 备注 | 
    | ------------ | ------------ | ------------ | ------------ |
    | type | string | - | 表单类型 |
    | label | string | - | 表单label |
    | field | string | - | 表单字段 |
    | clearable | boolean | - | 清空标识 |
    | visible | boolean | - | 可见标识 |
    | disabled | boolean | - | 禁用标识 |
    | multiple | boolean | - | 下拉多选标识 |
    | dateType | string | year \/ month \/ date \/ week \/  datetime \/ datetimerange \/ daterange | 时间日期组件类型（ 参考 element-ui  ） |
    | valueFormat | string | yyyy-MM-dd \/ yyyy-MM-dd hh:mm:ss \/ timestamp  | 时间日期组件值格式化 |

    ::: details 点击查看 schema 代码
    <<< @/docs/commonComponent/queryBar/schema.js
    :::

  - ## Event：
      | 事件名 | 回调参数 |  备注 | 
      | ------------ | ------------ | ------------ |
      |  change | Function( { field: string, data: any, formData: object}) | 查询栏表单值变化事件 | 
      |  opration | Function ( { trigger: string, formData: object ) } | 点击操作按钮事件 |

       - ### change 查询栏表单值变化触发事件
       ```javascript
       /**
        * form change 事件
        * @param { object } data
        * @param { string } data.field 触发的字段
        * @param { object } data.data 修改的数据
        * @param { object } data.formData 携带的表单数据
        */
        change({
          field: 'name',
          data: '马冬梅',
          formData: {
            name: '马冬梅',
            age: 17
          }
        })
       ```

       - ### opration 查询栏点击操作按钮事件

       ```javascript
       /**
        * 查询栏点击按钮事件
        * @param { object } data
        * @param { string } data.trigger 触发的类型
        * @param { object } data.formData 携带的表单数据
        */
        opration({
          trigger: 'search',
          formData: { /* ... */  }
        })
       ```