<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2020-12-07 19:18:10
 * @LastEditors: huangyuhui
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
    :total="100"
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
          type: 'string',
          clearable: true
        }
      ],
      tableSchema: {
        selection: {
          width: 50,
          label:'',
          isMultiple: true
        },
        column: [
          {
            field: 'name',
            label: '备案号',
            width: 150
          },
          {
            field: 'name1',
            label: '客户名称',
            width: 150
          },
          {
            field: 'name2',
            label: '英文名',
            width: 150
          },
          {
            field: 'name3',
            label: '状态',
            width: 150
          },
          {
            field: 'name4',
            label: '正式客户',
            width: 150
          },
          {
            field: 'name5 ',
            label: '业务',
            width: 150
          },
          {
            field: 'createTime',
            label: '创建日期',
            width: 150,
            sortable:true
          },
          {
            field: 'submitTime',
            label: '提交日期',
            width: 150,
            sortable:true
          },
          {
            field: 'auditTime',
            label: '审核日期',
            width: 150
          },
          {
            field: 'predictImportTime',
            label: '预计导入时间',
            width: 150
          },
          {
            field: 'lastTime',
            label: '最后跟进',
            width: 150
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