<!--
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:22:31
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-11 16:12:14
 * @Description: 表格输入
 * @FilePath: \scm_frontend_common\src\example\TableInput.vue
-->
<template>
  <div class="test-table-input">
    <TableInput
      :schema="schema"
      :collector="collector"
      >
      <template #age>
        <input type="text">
      </template>
    </TableInput>
  </div>
</template>

<script>
import TableInput from '../vue-component/TableInput/index';
import { useCollector } from '../vue-component/Form/FormValidate/directive';
import { isEmpty } from '../utils';
export default {
  components: {
    TableInput
  },
  data: () => ( {
    collector: useCollector(),
    schema: [
      [
        {
          type: 'label',
          label: '姓名'
        },
        {
          type: 'string',
          field: 'customerName',
          rules: {
            required: true,
            length: { min: 3, max: 4 },
            use: {
              checkInt( v ) {
                debugger;
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
          options:[
            { label:1, value:1 }
          ]
        },
        {
          type: 'label',
          label: '性别'
        },
        {
          type: 'select',
          options: [
            {
              label:'测试组1',
              disabled: true,
              options:[
                { value: 0,
                  label: '男' }
              ]
            },
            {
              label:'测试组2',
              options:[
                { value: 1,
                  label: '女' }
              ]
            }
          ]
        }
      ],
      [
        { label:'多选', type:'label' },
        { type:'radio', field:'xxx', options:[ { label:1, value:1 } ] }
      ]
    ]
  } )
};
</script>

<style scoped>
.test-table-input {
  margin: 50px 0;
}
</style>