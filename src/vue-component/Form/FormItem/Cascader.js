/*
 * @Author: your name
 * @Date: 2021-05-30 20:36:04
 * @LastEditTime: 2021-05-31 10:43:16
 * @LastEditors: Please set LastEditors
 * @Description: 级联组件
 * @FilePath: \scm-common\src\vue-component\Form\FormItem\D.js
 */

import { debounce } from 'lodash-es';
import { Cascader } from 'element-ui';
import { validate } from '../FormValidate/directive';
import { mergeCustomEvents } from './utils';
import './styles/Cascader.scss';
export default {
  abstract: true,
  components: {
    ElCascader: Cascader
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => []
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
      rules = {},
      clearable = false,
      customAttrs = {}
    } = this.conf;
    const {
      props = {},
      collapseTags = false,
      filterable = false,
      popperClass = '',
      beforeFilter,
      separator
    } = customAttrs;
    return h( 'ElCascader', {
      props: {
        value: this.value,
        options,
        props,
        'collapse-tags': collapseTags,
        disabled,
        clearable,
        filterable,
        popperClass:`${popperClass} scm-common_cascader`,
        separator,
        'before-filter': beforeFilter
      },
      ref:'cascader',
      directives: [
        field &&
          this.collector && {
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
          ? this.$t( `${this.entity}.${placeholder}` )
          : placeholder,
        name: field,
        id: field
      },
      on: mergeCustomEvents.call( this )
    } );
  }
};
