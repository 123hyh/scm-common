<!--
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:22:31
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-24 20:15:11
 * @Description: 表格输入
 * @FilePath: \scm_frontend_common\src\example\TableInput.vue
-->
<template>
  <TableInput>
    <template #age>
      <input type="text">
    </template>
  </TableInput>
</template>

<script>
import TableInput from '../vue-component/TableInput/index';
export default {
  components: {
    TableInput
  }
};
</script>

<style>
</style>