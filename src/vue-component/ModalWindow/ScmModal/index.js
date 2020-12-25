/*
 * @Author: your name
 * @Date: 2020-12-26 00:46:41
 * @LastEditTime: 2020-12-26 02:08:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
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
    }
  },
  render( h ) {
    const base =  h( 'component', {
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
    const keep = h( 'keep-alive',  [ base ]  );
    return  keep;
  }
};