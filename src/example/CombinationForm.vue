<!--
 * @Author: your name
 * @Date: 2020-12-05 12:44:08
 * @LastEditTime: 2020-12-13 00:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\example\TestForm.vue
-->
<template>
  <div>
    <ButtonGroup>
      <ElButton @click="handlerCheck">
        校验
      </ElButton>
      <ElButton @click="handlerReset">
        重置
      </ElButton>
      <ElButton @click="handlerSetFormData">
        设置表单数据
      </ElButton>
    </ButtonGroup>
   
    <CombinationForm
      ref="form"
      @change="handlerChange"
      />
  </div>
</template>

<script>
import CombinationForm  from '@/vue-component/Form/CombinationForm';
import { Button, ButtonGroup } from 'element-ui';
export default {
  components:{
    CombinationForm,
    ButtonGroup,
    ElButton:Button
  },
  methods:{
    async handlerCheck() {
      const d = await this.$refs.form.validate();
      console.log( d );
    },
    handlerReset() {
      this.$refs.form.resetFields();
    },
    handlerSetFormData() {
      this.$refs.form.setFormData( ( d ) => {
        return { ...d, name:'name' };
      } );
    },

    /**
     * 表单值变化事件
     * @description: 
     * @param {*} data
     * @return {*}
     */
    handlerChange( data ) {
      debugger;
    }
  }
};
</script>

<style>

</style>