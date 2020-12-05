<!--
 * @Author: your name
 * @Date: 2020-12-05 18:08:05
 * @LastEditTime: 2020-12-05 22:12:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\CombinationTable.vue
-->
<template>
  <CombinationTable
    :tableSchema="{}"
    :list="[]"
    />
</template>

<script>
import { CombinationTable } from '@/vue-component/index';
console.log( CombinationTable );
export default {
  components:{
    CombinationTable
  }
};
</script>

<style>

</style>