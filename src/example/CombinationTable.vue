<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2020-12-06 14:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\CombinationTable.vue
-->
<template>
  <CombinationTable
    clickRowSelected
    :queryBarSchema="queryBarSchema"
    :tableSchema="tableSchema"
    :list="list"
    :selectionMethod="selectionMethod"
    @sortChange="hanlderSort"
    @refresh="hanlderRefresh"
    @rowClick="hanlderClickRow"
    @rowDoubleClick="hanlderDblclickRow"
    @select="handlerSelectionChange"
    @selectAll="handlerSelectAll"
    >
    <!-- 字段插槽 -->
    <template #table_field_name="row">
      <span>【{{ row.name }}】 - 插槽</span>
    </template>
    <!-- 操作插槽 -->
    <template #table_operation="row">
      <button>修改{{ row.id }}</button>
    </template>
    <!-- 操作栏插槽 -->
  </CombinationTable>
</template>

<script>
import { CombinationTable } from '@/vue-component/index';
console.log( CombinationTable );
export default {
  components: {
    CombinationTable
  },
  data() {
    return {
      list: [
        { name: '换一换', age: 18, income: 3000 },
        { name: 'mff', age: 18, income: 3500 }
      ],
      queryBarSchema:[
        {
          field:'name',
          label:'姓名',
          type: 'string'
        }
      ],
      tableSchema: {
        index: {
          width: 50,
          label: '#'
        },
        selection: {
          width: 50,
          isMultiple: true
        },
        operation: {
          width: 200,
          label: '操作'
        },
        column: [
          {
            field: 'name',
            label: '姓名',
            sortable: true,
            fixed: 'left',
            viisble: true,
            tip: '测试Tip',
            width: 300
          },
          {
            field: 'born',
            label: '出生日期',
            width: 300
          },
          {
            field: 'age',
            label: '年龄',
            width: 300
          },
          {
            field: 'sex',
            label: '性别',
            width: 300
          },
          {
            field: 'height',
            label: '身高',
            width: 300
          },
          {
            field: 'income',
            align: 'right',
            label: '收入',
            width: 300
          }
        ]
      }
    };
  },
  methods: {

    /**
     * 排序事件
     * @description:
     * @param {*} data
     * @return {*}
     */
    hanlderSort( { field, order, formData = {} } = {} ) {
      console.log(
        `触发排序字段 ${field}, value: ${order}, 查询栏数据：${JSON.stringify(
          formData
        )}`
      );
    },

    /**
     * 刷新表格事件
     * @description:
     * @param {*}
     * @return {*}
     */
    hanlderRefresh() {
      console.log( '刷新表格' );
    },

    /**
     * 单击表格行事件
     * @description:
     * @param {*}
     * @return {*}
     */
    hanlderClickRow( rowData = {} ) {
      console.log( '当前点击行数据：', JSON.stringify( rowData ) );
    },

    /**
   * 双击行事件
   * @description: 
   * @param {*}
   * @return {*}
   */  
    hanlderDblclickRow( rowData ) {
      console.log( '当前双击行数据：', JSON.stringify( rowData ) );
    
    },

    /**
     * 勾选事件
     * @description: 
     * @param {*} selectData
     * @return {*}
     */
    handlerSelectionChange( selectData ) {
      console.log( '当前选择的数据', selectData );
    },

    /**
     * 勾选方法 (禁用)
     * @description: 
     * @param {*} row
     * @return {*}
     */
    selectionMethod( row = {} ) {
      return       row.income === 3000;
    },

    /**
   * 勾选全部 checkbox
   * @description: 
   * @param {*}
   * @return {*}
   */  
    handlerSelectAll( dd ) {
      console.log( '勾选全部 checkbox: ', dd );
    }
  }
};
</script>

<style>
</style>