<!--
 * @Author: your name
 * @Date: 2021-03-12 21:56:17
 * @LastEditTime: 2021-03-13 10:51:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm-common\src\example\KeepAlive\index.vue
-->
<template>
  <div>
    <div>
      <div>
        <input
          id="ACom"
          v-model="activeName"
          type="radio"
          value="ACom"
          name="ACom"
          >
        <label for="ACom">
          A组件
        </label>
      </div>
      <div>
        <input
          id="BCom"
          v-model="activeName"
          type="radio"
          value="BCom"
          name="Bcom"
          >
        <label for="BCom">
          B组件
        </label>
      </div>
      <div>
        <button @click.stop="() => updateCache( ['ACom'])">
          清空 key 为 ACom 组件
        </button>
        <button @click.stop="() => updateCache( ['BCom'])">
          清空 key 为 BCom 组件
        </button>
      </div>
    </div>
    <AKeepAlive :clearCaches="clearCaches">
      <component
        :is="activeName"
        ref="com"
        :key="activeName"
        />
    </AKeepAlive>
  </div>
</template>

<script>
import AKeepAlive, { getCacheKey } from '../../vue-component/KeepAlive/index';

import A from './A.vue';
import B from './B.vue';

export default {
  components: {
    AKeepAlive,
    ACom: A,
    BCom: B
  },
  data() {
    return {
      cName: '',
      activeName: '',
      clearCaches: []
    };
  },
  methods:{
    updateCache( keys = [] ) {
      console.log( this.$children );
      keys  = new Set( keys );
      const clearCaches = [];
      
      for ( const com of this.$children ) {
        if ( keys.has( com.$vnode.key ) ) {
          clearCaches.push( getCacheKey( com ) );
        }
      }

      this.clearCaches = clearCaches;

      // this.activeName = 'ACom';

      setTimeout(
        () => {
          this.clearCaches = []; 
        } 
      );
    }
  }
};
</script>

<style>
</style>