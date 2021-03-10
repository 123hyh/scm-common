/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-10 17:47:20
 * @Description:
 * @FilePath: \customs\src\components\common\Form\FormItem\Checkbox.js
 */
import { debounce } from 'lodash-es';
import { CheckboxGroup, Checkbox } from 'element-ui';
import { validate } from '../FormValidate/directive';
import { mergeCustomEvents } from './utils';

export default {
  abstract: true,
  components:{
    ElCheckboxGroup: CheckboxGroup,
    ElCheckbox: Checkbox
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => ( [] )
    },
    entity: {
      type: String,
      default: ''
    },

    /* 校验收集器 */
    collector: {
      type: Object,
      required: false
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
      'el-checkbox-group',
      {
        props: {
          value: this.value,
          disabled
        },
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
        attrs: {
          placeholder: this.entity
            ? this.$t( `${ this.entity }.${ placeholder }` )
            : placeholder,
          name: field,
          id: field
        },
        on:mergeCustomEvents.call( this )
        
      },
      options.map( ( { label, value, disabled = false } ) => {
        return h(
          'el-checkbox',
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
