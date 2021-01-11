<!--
 * @Author: your name
 * @Date: 2020-12-26 21:53:31
 * @LastEditTime: 2021-01-11 19:34:17
 * @LastEditors: huangyuhui
 * @Description: 表单校验组件
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormValidate\example.vue
-->
<template>
  <div class="test-form-validate">
    <!-- 组件测试 -->
    <FormValidate
      :collector="collector"
      field="namea"
      :rules="{
        required: true,
        length: { min: 3, max: 4 },
        use: {
          checkInter: (value, formData, field) => {
            return /^[0-9]+$/.test(value);
          },
        },
        message: {
          checkInter: '不是整数',
        },
      }"
      :value="formData.namea"
      >
      <ElInput v-model="formData.namea"/>
    </FormValidate>
    <FormValidate
      :collector="collector"
      field="agea"
      :rules="{
        required: true,
        message: {
          match: '测试age',
        },
        match: /^[0-9]+$/,
      }"
      :value="formData.agea"
      >
      <ElInput v-model="formData.agea"/>
    </FormValidate>

    <!-- 指令测试 -->
    <ElInput
      v-model="formData.name"
      v-validate="{
        collector: collector,
        field: 'name',
        rules: {
          required: true,
          message: {
            required: '必填',
          },
        },
      }"
      />
    <ElInput
      v-model="formData.sex"
      v-validate="{
        collector: collector,
        field: 'sex',
        rules: sexRule
      }"
      />
    <button @click.stop="handlerValidate">
      校验
    </button>
    <button @click.stop="()=>handlerValidate(['sex'])">
      校验单个
    </button>
    <button @click.stop="()=>updateRules()">
      添加非必填校验 & 校验整数
    </button>
    <button @click.stop="addRules">
      添加单个校验
    </button>
    <button @click.stop="()=>formData.sex = 'a1'">
      动态修改值
    </button>
    <button @click.stop="clearRules">
      清空校验
    </button>
    <button @click.stop="clearRulesMsg">
      清空校验信息
    </button>
  </div>
</template>

<script>
import { Input } from 'element-ui';
import FormValidate from './index';
import { Collector } from './collector';
import { validate } from './directive';
import { isEmpty } from '../../../utils';
export default {
  name: 'FormValidateexample',
  components: {

    FormValidate,
    ElInput: Input
  },
  directives: {
    validate
  },
  data: () => ( {
    collector: new Collector(),
    sexRule:{},
    formData: {    }
  } ),
  mounted() {
    setTimeout( () => {
      this.formData = {
        name: '',
        sex: '18',
        namea:'',
        agea:''
      };
    }, 2000 );
  },
  methods: {

    /**
     * 清空校验信息
     * @description: 
     * @param {*}
     * @return {*}
     */
    clearRulesMsg() {
      this.collector.resetValidate( [ 'name' ] );
    },

    /**
     * 校验
     * @description: 
     * @param {*}
     * @return {*}
     */
    async handlerValidate( fields = [] ) {
      const x = await this.collector.validate( fields );
      debugger;
    },

    /**
   * 清空校验
   * @description: 
   * @param {*}
   * @return {*}
   */  
    clearRules() {
      this.sexRule = {};
    },

    /**
     * 添加rules
     */
    addRules() {
      this.sexRule = {
        required: true,
        use: {
          checkInt( v ) {
            return /^[0-9]+$/.test( v );
          }
        },
        message: {
          checkInt: '必需整数',
          required: '必填'
        }
      };
    },

    /**
     * 修改校验规则
     */
    updateRules() {
      this.sexRule = {
        use: {
          checkInt( v ) {
            return isEmpty( v ) || /^[0-9]+$/.test( v );
          }
        },
        message: {
          checkInt: '必需整数',
          required: '必填'
        }
      };
    }
  }
};
</script>

<style scoped>
.test-form-validate {
  margin: 50px 0;
}
</style>