<!--
 * @Author: your name
 * @Date: 2020-12-05 16:16:25
 * @LastEditTime: 2020-12-05 18:12:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\App.vue
-->
<template>
  <Tabs
    v-model="activeName"
    type="border-card"
    >
    <TabPane
      name="form"
      label="表单"
      >
      <CombinationForm/>
    </TabPane>
    <TabPane
      name="table"
      label="表格"
      >
      <CombinationTable/>
    </TabPane>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';
import CombinationForm from './CombinationForm.vue';
import CombinationTable from './CombinationTable.vue';
export default {
  components:{
    Tabs,
    TabPane,
    CombinationForm,
    CombinationTable
  },
  data() {
    return {
      activeName:'form'
    };
  }
};
</script>

<style>

</style>