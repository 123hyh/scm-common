<!--
 * @Author: your name
 * @Date: 2020-11-06 21:46:52
 * @LastEditTime: 2020-12-22 23:38:56
 * @LastEditors: Please set LastEditors
 * @Description: 测试 scm from 组件
 * @FilePath: \SCM_2.0\src\views\example\src\formvalidate\example.vue
-->
<template>
  <div>
    <div class="test-form-validate">
      <ScmFormItem
        :collector="formCollector"
        :rules="nameRules"
        field="name"
        :value="formModel.name"
        >
        <template #label>
          name
        </template>
        <ElInput
          id="name"
          v-model="formModel.name"
          />
      </ScmFormItem>
      <ScmFormItem
        :collector="formCollector"
        :rules="remarkRules"
        field="remark"
        :value="formModel.remark"
        >
        <template #label>
          remark
        </template>
        <ElInput v-model="formModel.remark"/>
      </ScmFormItem>
    </div>

    <ElButton
      type="primary"
      @click="handlerValidate"
      >
      校验
    </ElButton>
    <ElButton
      type="primary"
      @click="resetValidate"
      >
      重置校验信息
    </ElButton>
    <ElButton
      type="primary"
      @click="handlerDeleteRemarkRules"
      >
      删除remark的rules
    </ElButton>
  </div>
</template>

<script>
import ScmFormItem, { useCollector } from './Validate';
import { Button, Input } from 'element-ui';
import { PublishSubscribe } from './publishSubscribe';

export default {
  components: {
    ScmFormItem,
    ElButton: Button,
    ElInput:Input
  },
  data() {
    return {
      enable: true,
      formCollector: new PublishSubscribe(),
      nameRules: [
        {
          required: true,
          trigger: [ 'blur', 'change' ],
          validator: ( rule, value, cb ) => {
            if ( value !== '2' ) {
              cb( '错误' );
            } else {
              cb();
            }
          }
        }
      ],
      remarkRules: [
        {
          required: true,
          message: '必填',
          trigger: [ 'blur', 'change' ]
        }
      ],
      formModel: {
        name: '',
        remark: ''
      }
    };
  },
  methods: {

    /**
     * 校验字段
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerValidate() {
      this.enable = false;
      const x = await this.formCollector.validate();
      console.log( '校验结果：', x );
    },

    /**
     * 清空校验信息
     * @description:
     * @param {*}
     * @return {*}
     */
    resetValidate() {
      this.formCollector.resetValidate();
    },

    /**
     * 清空一个rules
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerDeleteRemarkRules() {
      this.remarkRules = [];
    }
  }
};
</script>

<style lang='scss'>
.test-form-validate {
  display: flex;
  .scm-validate-wrap {
    display: flex;
    flex-basis: 25%;
    margin-bottom: 1.2em;
    .scm-validate-label {
      width: 100px;
    }
  }
}
</style>
