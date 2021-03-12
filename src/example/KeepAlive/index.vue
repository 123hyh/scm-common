<!--
 * @Author: your name
 * @Date: 2021-03-12 21:56:17
 * @LastEditTime: 2021-03-12 22:10:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm-common\src\example\KeepAlive\index.vue
-->
<template>
  <div>
    <div>
      <div>
        <input
          v-model="activeName"
          type="radio"
          value="ACom"
          >
        <label for="">
          A组件
        </label>
      </div>
      <div>
        <input
          v-model="activeName"
          type="radio"
          value="BCom"
          >
        <label for="">
          B组件
        </label>
      </div>
    </div>
    <AKeepAlive>
      <component
        :is="activeName"
        />
    </AKeepAlive>
  </div>
</template>

<script>
import AKeepAlive from '../../vue-component/KeepAlive/index';
import A from './A.vue';
import B from './B.vue';
export default {
  components:{
    AKeepAlive,
    ACom:A,
    BCom:B
  },
  data() {
    return {
      cName:'',
      activeName:''
    };
  }
};
</script>

<style>

</style>