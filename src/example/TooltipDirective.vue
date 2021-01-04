<!--
 * @Author: your name
 * @Date: 2021-01-03 20:23:22
 * @LastEditTime: 2021-01-03 23:45:20
 * @LastEditors: Please set LastEditors
 * @Description: 测试 tooltip 指令
 * @FilePath: \scm_frontend_common\src\example\Tooltip.vue
-->
<template>
  <div>
    <ElInput v-tooltip:[name]="{ value, content: '删除' }">
      123
    </ElInput>
    <button @click.stop="() => (value = !value)"/>
  </div>
</template>

<script>
import { Input } from 'element-ui';
import { tooltip } from '../directives';
export default {
  directives: {
    tooltip
  },
  components: {
    ElInput: Input
  },
  data() {
    return {
      value: false,
      content: '测试提示提示哦',
      name: 'hyh'
    };
  }
};
</script>

<style>
</style>