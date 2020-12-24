<!--
 * @Author: your name
 * @Date: 2020-12-05 16:16:25
 * @LastEditTime: 2020-12-24 19:23:29
 * @LastEditors: huangyuhui
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
    <TabPane
      name="print"
      label="打印"
      >
      <ScmPint/>
    </TabPane>
    <TabPane
      label="表单校验"
      name="validate"
      >
      <FormValidate/>
    </TabPane>
    <TabPane
      label="表格输入"
      name="tableinput"
      >
      <TableInput/>
    </TabPane>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';
import CombinationForm from './CombinationForm.vue';
import CombinationTable from './CombinationTable.vue';
import FormValidate  from './FormValidate.vue';
import Print from './Print.vue';
import TableInput  from './TableInput.vue';
export default {
  components:{
    Tabs,
    TabPane,
    CombinationForm,
    CombinationTable,
    ScmPint:Print,
    FormValidate,
    TableInput
  },
  data() {
    return {
      activeName:'tableinput'
    };
  }
};
</script>

<style>

</style>