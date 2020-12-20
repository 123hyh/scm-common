<!--
 * @Author: huangyuhui
 * @Date: 2020-09-29 09:55:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-14 20:02:26
 * @Description: 
 * @FilePath: \scm_frontend_common\docs\commonComponent\baseTable\README.md
-->
# 表格基础组件

   ```javascript 
      import CombinationTable from 'scm-common/src/vue-component/table/CombinationTable';
      /* 表格基础组件 */
      const BaseTable = CombinationTable.BaseTable
   ```

 - ## Props：

    | 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
    | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
    | schema | object | 是 | - | 表格配置项
    | list | Array\<object\>| 是 | - | 表格数据
    | height | string | 否 | - | 表格高度 | 
    | spanMethod | function | 否 | - | 合并行、列方法（参考element 表格的 span-method 方法） |
    | selectionMethod | Function | 否 | - | 单选列或多选列时自定义禁用选择方法 (row) => Boolean | 
    [schema配置参考](./BaseTableSchema.md)

----

 - ## Event：

    | 事件名 | 回调参数 |  备注 |  
    ------------ |  ------------- | -------------|
    | sortChange | ({ field: string, order: number}) | 表格点击排序事件
    | rowClick | ({ [propName]: any }) | 单击行事件 |
    | rowDoubleClick | ({ [propName]: any }) | 双击行事件 |
    | selectionChange | ({ [propName]: any }) | 点击复选框事件 | 

      - ### sortChange 排序事件

         ```javascript 
         /**
            * 排序事件
            * @param { object } data 
            * @param { string } data.field 触发该事件的字段名
            * @param { number } data.order 排序方式( 1 升序 | 0 降序)
            */
            sortChange({ field: 'name', order: 1});
         ```
      
      - ### rowClick 单击行事件
         ```javascript
            /**
            * 单击行事件
            * @param { object } data 单击当前行的数据
            */
            rowClick({prop: 1})
         ```
      -  ### rowDoubleClick 双击行事件
      
         ```javascript 
         /**
          * 双击行事件
         * @param { object } data 双击当前行数据
         */
         rowDoubleClick({ prop: 1})
         ```
      - ### selectionChange 复选框事件

         ```javascript 
         /**
         * 复选框事件
         * @param { object } data 点击当前复选框的行数据
         */
         selectionChange({ prop: 1 })
         ```
----

 - ## 3、 Slot：
   |  插槽名称  | 参数  |  备注  |
   | ------------ | ------------ | ------------ |
   | operation | ( row ) | 操作列插槽 |
   | [ field ] | ( row ) | schema 中 column 的每一项都具有插槽，名为 field 字段 |

   示例：
      ```html
      <template v-slot:operation="row">
         <p>测试操作列{{ row }}</p>
      </template>
      
      <template v-slot:name>
         <p>测试 field 字段插槽 {{ row }} </p>
      </template>
      ```