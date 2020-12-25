/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 14:32:28
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-25 11:27:55
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\TdItem.js
 */

import StringItem from '../Form/FormItem/String.js';
import SelectItem from '../Form/FormItem/Select.js';
import DateItem from '../Form/FormItem/Date.js';
import RadioItem from '../Form/FormItem/Radio.js';
import CheckboxItem from '../Form/FormItem/Checkbox.js';
import SwitchItem from '../Form/FormItem/Switch';
const aliasComName = {
  string: 'StringItem',
  select:'SelectItem',
  date:'DateItem',
  radio:'RadioItem',
  checkbox:'CheckboxItem',
  switch: 'SwitchItem'
};
export default {
  name: 'TdItem',
  components: {
    StringItem,
    SelectItem,
    DateItem,
    RadioItem,
    CheckboxItem,
    SwitchItem
  },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    formData: {
      type: Object,
      required: true
    },
    schema: {
      type: Object,
      required: true
    }
  },
  render( h ) {
    const { schema: { field, type, visible = true,  label }, formData } = this;
    return visible ? h(
      'td',
      {
        attrs: {
          'data-field': this.schema.field,
          colspan: this.schema.colspan,
          rowspan: this.schema.rowspan
        },
        class: [
          'td-item',
          type === 'label' && 'td-label'
        ].filter( Boolean )
      },
      [

        type && type !== 'slot'  && visible && h( aliasComName[ type ], {
          props: {
            value: formData[ field ],
            conf:this.schema
          },
          on:{
            input: v  => {
              this.$set( this.formData, field, v ); 
            }
          }
        } ),

        /* 插槽 */
        visible && type === 'slot' && this.$scopedSlots[ field ](),
        visible && type === 'label' && label
      ].filter( Boolean )
    ) : undefined;
  },
  mounted() {
    const { field } = this.schema;
    if ( field ) {
      const unwatch = this.$watch( `formData.${field}`, ( val ) => {
        this.$emit( 'change', { field, val } );
      }, {
        deep: true
      } );
      this.$once( 'hook:beforeDestroy', unwatch );
    }
  }
};