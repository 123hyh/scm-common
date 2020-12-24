/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 20:03:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-24 20:12:20
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\TrItem.js
 */
import TdItem from './TdItem.js';
import './style/tr.scss';
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
    }
  },
  render( h ) {
    return h(
      'tr',
      this.schema.map(
        ( item, index ) => h(
          'TdItem',
          {
            key: index,
            scopedSlots: this.$scopedSlots,
            props: {
              formData: this.formData,
              schema: item
            }
          }
        )
      )
    );
  }
};