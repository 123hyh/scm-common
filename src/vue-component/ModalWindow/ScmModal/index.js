/*
 * @Author: your name
 * @Date: 2020-12-26 00:46:41
 * @LastEditTime: 2020-12-26 19:47:35
 * @LastEditors: Please set LastEditors
 * @Description: 模态窗组件
 * @FilePath: \scm_frontend_common\src\vue-component\ModalWindow\ScmModal\index.js
 */
import ScmModal from './ScmModal.vue';
export default {
  inheritAttrs: false,
  name:'ScmModalWrap',
  components: {
    ScmModal
  },
  props:{
    visible: {
      type:Boolean,
      default: false
    },
    cached:{
      type: Boolean,
      default: true
    }
  },
  render( h ) {
    const BASE =  h( 'component', {
      is: this.visible ? 'ScmModal' : '',
      scopedSlots: this.$scopedSlots,
      attrs: this.$attrs,
      props:{
        visible: this.visible
      },
      on:{
        ...this.$listeners
      }
    } );
    const KEEP = h( 'keep-alive', [ BASE ]  );
    return this.cached ? KEEP : BASE;
  }
};