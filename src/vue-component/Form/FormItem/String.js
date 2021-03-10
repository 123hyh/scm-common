/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 16:36:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-10 17:44:24
 * @Description:
 * @FilePath: \customs\src\components\common\Form\FormItem\String.js
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
      type: [ String, Number ],
      default: ''
    },

    /* 校验收集器 */
    collector:{
      type:Object,
      required: false
    },
    entity: {
      type: String,
      default: ''
    }
  },
  directives:{

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
      showPassword = false,
      disabled = false,
      clearable = false,
      placeholder = '',

      /**
       * 校验规则
       */
      rules = {}
    } = this.conf;
    return h(
      'el-input',
      {
        props: {
          value: this.value,
          'show-password': showPassword,
          disabled,
          clearable
        },
        directives: [
          field && this.collector &&  {
            name:'validate',
            value:{
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
      }
    );
  }
};
