<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2021-05-31 18:25:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\CombinationTable.vue
-->
<template>
  <div
    v-loading="loading"
    class="combination-table"
    >
    <div class="aside"/>
    <div class="content-table">
      <CombinationTable
        entityName="combination-table"
        clickRowSelected
        :queryBarSchema="queryBarSchema"
        :tableSchema="tableSchema"
        :list="list"
        :selectionMethod="selectionMethod"
        :total="100"
        :border="true"
        @queryBarChange="handlerQueryChange"
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
          <button v-ripple.mouseover.500="'rgba(255, 255, 255, 0.35)'">
            修改{{ row.id }}
          </button>
        </template>
        <!-- 操作栏插槽 -->
      </CombinationTable>

      <BaseTable
        border
        :schema="tableSchema"
        :list="list"
        />
    </div>
  </div>
</template>

<script>
import CombinationTable from '@/vue-component/table/CombinationTable';
console.log( CombinationTable );
import { loading } from '../directives/index';
import ripple from '../directives/ripple';
export default {
  components: {
    CombinationTable,
    BaseTable: CombinationTable.BaseTable
  },
  directives: {
    loading: loading,

    /* 测试指令 */
    ripple
  },
  data() {
    return {
      loading: false,
      list: [
        { name: '换一换', age: 18, income: 3000 },
        { name: 'mff', age: 18, income: 3500 }
      ],
      queryBarSchema: [

        /* {
          type: 'cascader',
          field: 'cascader1',
          visible: false,
          clearable: true,
          customAttrs:{
            props:{ multiple: true },
            'collapseTags': true
          },
          options: [
            {
              value: 1,
              label: '东南',
              children: [
                {
                  value: 2,
                  label: '上海',
                  children: [
                    { value: 3, label: '普陀' },
                    { value: 4, label: '黄埔' },
                    { value: 5, label: '徐汇' }
                  ]
                },
                {
                  value: 7,
                  label: '江苏',
                  children: [
                    { value: 8, label: '南京' },
                    { value: 9, label: '苏州' },
                    { value: 10, label: '无锡' }
                  ]
                },
                {
                  value: 12,
                  label: '浙江',
                  children: [
                    { value: 13, label: '杭州' },
                    { value: 14, label: '宁波' },
                    { value: 15, label: '嘉兴' }
                  ]
                }
              ]
            },
            {
              value: 17,
              label: '西北',
              children: [
                {
                  value: 18,
                  label: '陕西',
                  children: [
                    { value: 19, label: '西安' },
                    { value: 20, label: '延安' }
                  ]
                },
                {
                  value: 21,
                  label: '新疆维吾尔族自治区',
                  children: [
                    { value: 22, label: '乌鲁木齐' },
                    { value: 23, label: '克拉玛依' }
                  ]
                }
              ]
            }
          ]
        }, */
        {
          type:'select',
          label:'测试下拉1',
          'collapse-tags': true,
          multiple: true,
          options:[
            {
              label:'test-1',
              value: 1
            },
            {
              label:'test-2',
              value: 2
            }
          ],
          field:'select1.1'
        },
        {
          field: 'name1',
          label: '姓名1',
          type: 'date',
          dateType: 'daterange',
          format: 'yyyy-MM-dd',
          clearable: true
        },
        {
          field: 'name2',
          label: '姓名2',
          type: 'select',
          clearable: true
        },
        {
          field: 'name3',
          label: '姓名3',
          type: 'string',
          clearable: true
        },
        {
          field: 'name4',
          label: '姓名4',
          type: 'string',
          clearable: true
        },
        {
          field: 'name5',
          label: '姓名5',
          type: 'string',
          clearable: true
        },
        {
          field: 'name6',
          label: '姓名',
          type: 'string',
          clearable: true
        },
        {
          field: 'name7',
          label: '姓名7',
          type: 'string',
          clearable: true
        },
        {
          field: 'name8',
          label: '姓名',
          type: 'string',
          clearable: true
        }
      ],
      tableSchema: {
        selection: {
          width: 50,
          label: '',
          isMultiple: true
        },
        column: [
          {
            field: 'name1.1',
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
            sortable: true
          },
          {
            field: 'submitTime',
            label: '提交日期',
            width: 150,
            sortable: true
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
     * 查询栏变化时间
     */
    handlerQueryChange( ...args ) {
      console.log( args );
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
      return row.income === 3000;
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

<style lang='scss' scoped>
.combination-table {
  display: flex;
  .aside {
    width: 180px;
    height: 100%;
  }
  .content-table {
    width: calc(100% - 180px);
  }
}
</style>