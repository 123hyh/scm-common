<!--
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:22:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-10 17:56:44
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
      <template #customerValidate="_schema">
        <div
          v-validate="{
            collector: collector,
            field: _schema.field,
            data: customerData,
            rules: {
              use: {
                required(v, ctx) {
                  const x = JSON.parse(v);
                  return true;
                },
              },
            },
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
const events = () => ( {
  'remove-tag': function ( v ) {
    console.log( 'remove-tag' );
  },
  'visible-change': ( V ) => {
    console.log( 'visible-change' );
  },
  blur: ( v ) => {
    console.log( 'blur' );
  },
  focus: ( v ) => {
    console.log( 'focus' );
  },
  clear: ( v ) => {
    console.log( 'clear' );
  },
  change( v ) {
    console.log( 'change' );
  },
  input( v ) {
    console.log( 'input' );
  }
} );
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
          },
          customEvent: events()
        },
        {
          type: 'label',
          label: '年龄'
        },
        {
          type: 'checkbox',
          field: 'age',
          customEvent: events(),
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
        { label: '单选', type: 'label' },
        {
          type: 'radio',
          field: 'singleChoice',
          options: [
            { label: '1', value: '1' },
            { label: '2', value: '2' }
          ],
          customEvent: events()
        },
        {
          type: 'select',
          multiple: true,
          clearable: true,
          options: [
            { label: '多选1', value: 1 },
            { label: '多选2', value: 2 }
          ],
          field: 'multiple-t',
          customEvent: events()
        },
        {
          type:'date',
          valueFormat:'yyyy/MM/dd',
          field:'date',
          customEvent: events()
        },
        {
          type:'switch',
          field:'switch_value',
          customEvent: events()
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
    },
    handlerChange( { field, data } ) {},

    /**
     * 表单输入事件变化
     * @description:
     * @param {*} v
     * @return {*}
     */
    handlerInput( v ) {},

    /**
     * 清空选项值
     * @description:
     * @param {*} v
     * @return {*}
     */
    handlerClear( v ) {},

    /**
     * 移除选中的下拉 tag
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerRemoveTag( v ) {}
  }
};
</script>

<style scoped>
.test-table-input {
  margin: 50px 0;
}
</style>