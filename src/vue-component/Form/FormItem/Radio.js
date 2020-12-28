/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-27 17:09:34
 * @Description:
 * @FilePath: \customs\src\components\common\Form\FormItem\Radio.js
 */
import { debounce } from 'lodash-es';
import { RadioGroup, Radio } from 'element-ui';
import { validate } from '../FormValidate/directive';

export default {
  abstract: true,
  components:{
    ElRadioGroup: RadioGroup,
    ElRadio: Radio
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: [ String, Number, Boolean ]
    },

    /* 校验收集器 */
    collector: {
      type: Object,
      required: false
    },
    entity: {
      type: String,
      default: ''
    }
  },
  directives: {

    /* 校验输入 */
    validate
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
      placeholder = '',
      options = [],
      rules = {}
    } = this.conf;
    return h(
      'el-radio-group',
      {
        directives: [
          field && this.collector && {
            name: 'validate',
            value: {
              collector: this.collector,
              field,
              rules
            }
          }
        ].filter( Boolean ),
        props: {
          value: this.value,
          disabled
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
      options.map( ( { label, value, disabled = false } ) => {
        return h(
          'el-radio',
          {
            props: {
              label: value,
              disabled
            },
            key: value
          },
          label
        );
      } )
    );
  }
};
