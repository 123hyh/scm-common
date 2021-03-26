<!--
 * @Author: your name
 * @Date: 2021-03-12 21:56:17
 * @LastEditTime: 2021-03-26 14:30:07
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
        <button @click.stop="() => onRefresh()">
          刷新
        </button>
      </div>
    </div>
    <AKeepAlive v-model="clearCaches">
      <component
        :is="activeName"
        v-if="refreshd === false"
        ref="com"
        :key="activeName"
        />
      <div v-else>
        正在刷新~
      </div>
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
      clearCaches: [],
      refreshd: false
    };
  },
  methods:{

    /**
     * 清空某个组件缓存
     */
    updateCache( keys = [] ) {
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
    },

    /**
     * 刷新当前组件
     */
    onRefresh() {
      const key = getCacheKey( this.$refs.com ); 
      this.refreshd = true;
      this.clearCaches = [ key ];
      setTimeout( () => {
        this.refreshd  = false; 
      }, 5000 );
    }
  }
};
</script>

<style>
</style>