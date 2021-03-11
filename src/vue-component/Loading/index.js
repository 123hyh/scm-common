/*
 * @Author: your name
 * @Date: 2021-03-11 16:42:48
 * @LastEditTime: 2021-03-11 17:28:21
 * @LastEditors: Please set LastEditors
 * @Description: loading 组件
 * @FilePath: \scm-common\src\vue-component\Loading\index.js
 */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  abstract: true,
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  render( h ) {
    const slot = this.$scopedSlots.default ? this.$scopedSlots.default() : [];

    return h(
      'Loading',
      {
        props: {
          active: this.loading,
          height: 95,
          width: 95,
          color: '#0086fa',
          loader: 'dots',
          blur:'20px',
          'background-color':'#f3f6f9',
          'is-full-page': false
        }
      },
      slot
    );
  }
};
