<!--
 * @Author: your name
 * @Date: 2020-12-05 16:16:25
 * @LastEditTime: 2020-12-27 15:32:37
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
    <TabPane
      label="模态窗"
      name="ScmModal"
      >
      <ScmModal/>
    </TabPane>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';
import CombinationForm from './CombinationForm.vue';
import CombinationTable from './CombinationTable.vue';
import Print from './Print.vue';
import TableInput  from './TableInput.vue';
import FormValidate from './FormValidate/index.vue';
export default {
  components:{
    Tabs,
    TabPane,
    CombinationForm,
    CombinationTable,
    ScmPint:Print,

    // FormValidate,
    FormValidate,
    TableInput,
    ScmModal: () => import( './Modal.vue' )
  },
  data() {
    return {
      activeName:'validate'
    };
  }
};
</script>

<style>

</style>