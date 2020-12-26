<!--
 * @Author: your name
 * @Date: 2020-12-26 21:53:31
 * @LastEditTime: 2020-12-27 00:54:44
 * @LastEditors: Please set LastEditors
 * @Description: 表单校验组件
 * @FilePath: \scm_frontend_common\src\example\FormValidate\example.vue
-->
<template>
  <div class="test-form-validate">
    <FormValidate
      :collector="collector"
      field="name"
      :rules="{
        required: true,
        length: { min: 3, max: 4 },
        use: {
          checkInter: (value, formData, field) => {
            return /^[0-9]+$/.test(value)
          },
        },
        message: {
          checkInter: '不是整数',
        },
      }"
      :value="formData.name"
      >
      <ElInput v-model="formData.name"/>
    </FormValidate>
    <FormValidate
      :collector="collector"
      field="age"
      :rules="{
        required: true,
        message: {
          match: '测试age',
        },
        match: /^[0-9]+$/,
      }"
      :value="formData.age"
      >
      <ElInput v-model="formData.age"/>
    </FormValidate>
    <button @click.stop="handlerValidate">
      校验
    </button>
  </div>
</template>

<script>
import { Input } from 'element-ui';
import FormValidate from './index';
import { Collector } from './collector';
export default {
  name: 'FormValidateexample',
  components: {
    FormValidate,
    ElInput: Input
  },
  data: () => ( {
    collector: new Collector(),
    formData: {
      name: ''
    }
  } ),
  methods: {
    async handlerValidate() {
      const x = await this.collector.validate();
      debugger;
    }
  }
};
</script>

<style scoped>
.test-form-validate{
  margin: 50px 0;
}
</style>