/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 13:15:25
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Select.js
 */
import { debounce } from 'lodash-es';
import { Select, Option } from 'element-ui';

export default {
  abstract: true,
  components:{
    ElSelect: Select,
    ElOption: Option
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: [ String, Number, Array, Boolean ]
    },
    entity: {
      type: String,
      default: ''
    }
  },
  methods: {
    get emit() {
      return debounce( function ( data ) {
        this.$emit( 'change', data );
      }, 200 );
    }
  },
  render( h ) {
    const {
      field = '',
      disabled = false,
      clearable = false,
      multiple = false,
      placeholder = '',

      options = []
    } = this.conf;
    return h(
      'el-select',
      {
        props: {
          value: this.value,
          filterable: true,
          popperAppendToBody: false,
          multiple,
          disabled,
          clearable
        },
        attrs: {
          placeholder: this.entity
            ? this.$t( `${ this.entity }.${ placeholder }` )
            : placeholder,
          name: field,
          id: field
        },
        on: {
          input: [
            this.$listeners.input,
            val => {
              this.emit( val );
            }
          ]
        }
      },
      options.map(
        ( { label, value, disabled = false } ) => {
          return h(
            'el-option',
            {
              props: {
                label,
                value,
                disabled
              },
              key: value
            }
          );
        }
      )
    );
  }
};
