<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2020-12-05 22:53:43
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
      <button>修改{{ row.id }}</button>
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
      list:[
        { name: '换一换', age:18 },
        { name: 'mff', age:18 }
      ],
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
            label:'姓名'
          },
          {
            field: 'age',
            label:'年龄'
          }
        ]
      }
    };
  }
};
</script>

<style>

</style>