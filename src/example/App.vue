<!--
 * @Author: your name
 * @Date: 2020-12-05 16:16:25
 * @LastEditTime: 2021-01-21 19:06:38
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\App.vue
-->
<template>
  <Tabs
    v-model="activeName"
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
      name="tip"
      />
    <TabPane
      label="测试umy"
      name="UmyUiCom"
      />
    <keep-alive>
      <component :is="activeName"/>
    </keep-alive>
  </Tabs>
</template>

<script>
import { Tabs, TabPane } from 'element-ui';
import CombinationForm from './CombinationForm.vue';
import CombinationTable from './CombinationTable.vue';
import Print from './Print.vue';
import TableInput  from './TableInput.vue';
import FormValidate from './FormValidate/index.vue';
import TooltipDirective from './TooltipDirective.vue';
import UmyUiCom from './UmyUi.vue';
export default {
  components:{
    Tabs,
    TabPane,
    CombinationForm,
    CombinationTable,
    ScmPint:Print,
    UmyUiCom,

    // FormValidate,
    FormValidate,
    TableInput,
    ScmModal: () => import( './Modal.vue' ),
    TooltipDirective
  },
  data() {
    return {
      activeName:'table'
    };
  }
};
</script>

<style>

</style>