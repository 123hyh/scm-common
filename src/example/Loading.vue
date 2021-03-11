<!--
 * @Author: your name
 * @Date: 2021-03-11 16:43:48
 * @LastEditTime: 2021-03-11 17:10:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm-common\src\example\Loading.vue
-->
<template>
  <div style="position:relative; height:500px; width=100%">
    <Loading :loading="loading"/>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat
        laborum libero explicabo, error nulla? Suscipit ab aliquid excepturi,
        autem deserunt, magni officia qui fugit iste nihil, possimus similique
        ut!
      </p>
    </div>
    <button @click="switchLoading">
      {{ loading ? '关':'开' }}
    </button>
  </div>
</template>

<script>
import Loading from '../vue-component/Loading';
export default {
  components: {
    Loading
  },
  data: () => ( {
    loading: false
  } ),
  methods:{
    switchLoading() {
      if ( this.loading ) {
        this.loading = false;
      } else {
        this.loading = true;

        setTimeout( () => {
          this.loading = false;
                  
        }, 2000 );
      }
    }
  }
};
</script>

<style>
</style>