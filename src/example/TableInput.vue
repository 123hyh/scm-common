<!--
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:22:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-27 23:14:37
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
                const isPass = isEmpty( v ) || /^[0-9]+$/.test( v );
                debugger;
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
          type: 'string',
          field: 'age'
        },
        {
          type: 'label',
          label: '性别'
        },
        {
          type: 'select',
          options: [
            {
              value: 0,
              label: '女'
            },
            {
              label: '男',
              value: 1
            }
          ]
        }
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