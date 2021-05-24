/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 20:03:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-24 17:35:00
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\TrItem.js
 */
import TdItem from './TdItem.js';
export default {
  name: 'TrItem',
  components: {
    TdItem
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    collector:{
      type:Object,
      required: false
    }
  },
  render( h ) {
    const currentKey = index => `${this.$vnode.key}_td_${index}`;
    return h(
      'tr',
      this.schema.map(
        ( item, index ) => h(
          'TdItem',
          {
            key: currentKey( index ),
            scopedSlots: this.$scopedSlots,
            on:{
              ...this.$listeners
            },
            props: {
              formData: this.formData,
              schema: item,
              collector: this.collector
            }
          }
        )
      )
    );
  }
};