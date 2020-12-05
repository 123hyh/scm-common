<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2020-12-05 22:49:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\CombinationTable.vue
-->
<template>
  <CombinationTable
    :tableSchema="tableSchema"
    :list="list"
    >
    <template #table_operation="row">
      <button>修改{{ row.id }}}</button>
    </template>
    <!-- 操作栏插槽 -->
  </CombinationTable>
</template>

<script>
import { CombinationTable } from '@/vue-component/index';
console.log( CombinationTable );
export default {
  components:{
    CombinationTable
  },
  data() {
    return {
      list:[],
      tableSchema:{
        index:{
          width: 50,
          label:'#'
        },
        selection:{
          width: 50,
          isMultiple: true
        },
        operation:{
          width:200,
          label:'操作'
        },
        column: [
          {
            field: 'name',
            label:'姓名',
            width:100
          }
        ]
      }
    };
  }
};
</script>

<style>

</style>