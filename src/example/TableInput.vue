<!--
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:22:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-08 19:00:06
 * @Description: 表格输入
 * @FilePath: \scm_frontend_common\src\example\TableInput.vue
-->
<template>
  <div class="test-table-input">
    <TableInput
      :formData="formData"
      :schema="schema"
      :collector="collector"
      @change="handlerChange"
      @input="handlerInput"
      @clear="handlerClear"
      @remove-tag="handlerRemoveTag"
      >
      <template #age>
        <input type="text">
      </template>
      <template #customerValidate="schema">
        <div
          v-validate="{
            collector:collector,
            field:schema.field,
            data:customerData,
            rules:{
              use:{
                required(v,ctx){
                  const x = JSON.parse(v)
                  return true
                }
              }
            }
          }"
          >
          <input
            v-model="customerData.v"
            type="text"
            >
        </div>
      </template>
    </TableInput>
    <button @click.stop="handlerValidate">
      校验
    </button>
  </div>
</template>

<script>
import TableInput from '../vue-component/TableInput/index';
import {
  useCollector,
  validate
} from '../vue-component/Form/FormValidate/directive';
import { isEmpty } from '../utils';

export default {
  components: {
    TableInput
  },
  directives: {
    validate
  },
  data: () => ( {
    formData: {},
    collector: useCollector(),
    customerData: {
      v: ''
    },
    schema: [
      [
        {
          type: 'label',
          label: '姓名'
        },
        {
          type: 'string',
          clearable: true,
          field: 'customerName',
          rules: {
            required: true,
            length: { min: 3, max: 4 },
            use: {
              checkInt( v ) {
                const isPass = isEmpty( v ) || /^[0-9]+$/.test( v );
                return isPass;
              }
            },
            message: {
              length: '长度3-4',
              checkInt: '必需整数',
              required: '必填'
            }
          }
        },
        {
          type: 'label',
          label: '年龄'
        },
        {
          type: 'checkbox',
          field: 'age',
          options: [ { label: 1, value: 1 } ]
        },
        {
          type: 'label',
          label: '性别'
        },
        {
          type: 'select',
          field: 'sex',
          clearable: true,
          options: [
            {
              label: '测试组1',
              disabled: true,
              options: [ { value: 0, label: '男' } ]
            },
            {
              label: '测试组2',
              options: [ { value: 1, label: '女' } ]
            }
          ]
        }
      ],
      [
        { label: '多选', type: 'label' },
        { type: 'radio', field: 'xxx', options: [ { label: 1, value: 1 } ] },
        {
          type: 'select',
          multiple: true,
          options: [
            { label: '多选1', value: 1 },
            { label: '多选2', value: 2 }
          ],
          field: 'multiple-t'
        }
      ],
      [
        {
          label: '自定义校验',
          type: 'label'
        },
        {
          type: 'slot',
          field: 'customerValidate'
        }
      ]
    ]
  } ),

  methods: {
    async handlerValidate() {
      await this.collector.validate();
      debugger;
    },
    handlerChange( { field, data } ) {
      debugger;
      if ( field === 'customerName' ) {
        debugger;
      }
    },

    /**
     * 表单输入事件变化
     * @description:
     * @param {*} v
     * @return {*}
     */
    handlerInput( v ) {
      debugger;
    },

    /**
     * 清空选项值
     * @description: 
     * @param {*} v
     * @return {*}
     */
    handlerClear( v ) {
      debugger;
    },

    /**
     * 移除选中的下拉 tag
     * @description: 
     * @param {*}
     * @return {*}
     */
    handlerRemoveTag( v ) {
      debugger;
    }
  }
};
</script>

<style scoped>
.test-table-input {
  margin: 50px 0;
}
</style>