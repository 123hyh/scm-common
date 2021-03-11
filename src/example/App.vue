<!--
 * @Author: your name
 * @Date: 2020-12-05 16:16:25
 * @LastEditTime: 2021-03-11 16:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\App.vue
-->
<template>
  <div>
    <Tabs
      v-model="activeName"
      type="border-card"
      >
      <TabPane
        name="CombinationForm"
        label="表单"
        />
      <TabPane
        name="CombinationTable"
        label="表格"
        />
      <TabPane
        name="ScmPint"
        label="打印"
        />
      <TabPane
        label="表单校验"
        name="FormValidate"
        />
      <TabPane
        label="表格输入"
        name="TableInput"
        />
      <TabPane
        label="模态窗"
        name="ScmModal"
        />
      <TabPane
        label="tip指令"
        name="TooltipDirective"
        />
      <TabPane
        label="loading组件"
        name="Loading"
        />
    </Tabs>
    <component :is="activeName"/>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';
import CombinationForm from './CombinationForm.vue';
import CombinationTable from './CombinationTable.vue';
import Print from './Print.vue';
import TableInput  from './TableInput.vue';
import FormValidate from './FormValidate/index.vue';
import TooltipDirective from './TooltipDirective.vue';
import Loading from './Loading.vue';
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
    ScmModal: () => import( './Modal.vue' ),
    TooltipDirective,
    Loading
  },
  data() {
    return {
      activeName:'Loading'
    };
  }
};
</script>

<style>

</style>