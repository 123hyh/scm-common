/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 14:32:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-19 14:48:27
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
  select: 'SelectItem',
  date: 'DateItem',
  radio: 'RadioItem',
  checkbox: 'CheckboxItem',
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
    },
    collector: {
      type: Object,
      required: false
    }
  },
  render( h ) {
    const {
      schema: { field, type, visible = true, label, customEvent = {} },
      formData
    } = this;
    return visible
      ? h(
        'td',
        {
          attrs: {
            'data-field': this.schema.field,
            colspan: this.schema.colspan,
            rowspan: this.schema.rowspan
          },
          class: [ 'td-item', type === 'label' && 'td-label' ].filter( Boolean )
        },
        [
          type &&
              type !== 'slot' &&
              visible &&
              h( aliasComName[ type ], {
                props: {
                  value: formData[ field ],
                  conf: this.schema,
                  collector: this.collector
                },
                on: {
                  input: [

                    // 设置 formData 中 的值
                    ( v ) => {
                      this.$set( this.formData, field, v );
                    }
                  ].filter( Boolean ),
                  
                  // 下传用户自定义表单事件
                  customEvent: () => customEvent
                }
              } ),

          /* 插槽 */
          visible &&
              type === 'slot' &&
              this.$scopedSlots[ field ] &&
              this.$scopedSlots[ field ]( this.schema ),
          visible && type === 'label' && label
        ].filter( Boolean )
      )
      : undefined;
  },
  mounted() {
    const { field } = this.schema;
    if ( field ) {
      const unwatch = this.$watch(
        `formData.${field}`,
        ( value, prev ) => {
          const sendData = { field, value }; 
          if ( typeof value === 'object' ) {
            this.$emit( 'change', sendData );

            /* 该事件用于 代替 上面的 change (语义错误) */
            this.$emit( 'watchFormDataChange', sendData );
          } else {
            if ( value !== prev ) {
              this.$emit( 'change', sendData );
              this.$emit( 'watchFormDataChange', sendData );
            }
          }
        },
        {
          deep: true
        }
      );
      this.$once( 'hook:beforeDestroy', unwatch );
    }
  }
};
