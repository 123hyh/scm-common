<!--
 * @Author: your name
 * @Date: 2020-12-12 07:42:34
 * @LastEditTime: 2020-12-12 08:01:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/src/vue-component/Print/Print.vue
-->
<template>
  <ElButton @click.stop="handlerClickPrint">
    打印
  </ElButton>
</template>

<script>
import hiPrintJs from './hiprint.bundle';
import { Button } from 'element-ui';
export default {
  name:'ScmPrint',
  components:{
    ElButton:Button
  },
  methods:{
    handlerClickPrint() {
      console.log( hiPrintJs );
    }
  }
};
</script>

<style>

</style>