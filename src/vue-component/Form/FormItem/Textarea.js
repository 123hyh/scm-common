/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 16:36:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-10 17:57:55
 * @Description: 文本域
 * @FilePath: \customs\src\components\common\Form\FormItem\Textarea.js
 */
import { debounce } from 'lodash-es';
import { Input } from 'element-ui';
import { validate } from '../FormValidate/directive';
import { mergeCustomEvents } from './utils';

export default {
  abstract: true,
  components:{
    ElInput: Input
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ''
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
      field,
      disabled = false,
      clearable = false,
      placeholder = '',
      rules = {}
    } = this.conf;
    return h(
      'el-input',
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
          type: 'textarea',
          autosize: true,
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
        on: mergeCustomEvents.call( this )
      }
    );
  }
};
