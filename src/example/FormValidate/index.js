/*
 * @Author: your name
 * @Date: 2020-12-26 21:50:49
 * @LastEditTime: 2020-12-27 01:16:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\FormValidate\index.js
 */
import './style/index.scss';

import { Collector } from './collector';

export default {
  name: 'FormValidate',
  componentName: 'ElFormItem',
  props: {
    field: {
      type: String,
      required: true
    },
    collector: {
      type: Collector,
      required: true
    },
    rules: {
      type: Object
    },
    value: {
      type: [ String, undefined, Number, Array, Object, Boolean ]
    }
  },
  data() {
    return {
      errMsg: ''
    };
  },
  mounted() {
    this.handlerRegisterEvent();
    
    this.$watch( 'rules', () => {
      if ( this.field ) {
        this.collector.addValidate( this.field, () => {
          return {
            value: this.value,
            rules: this.rules,
            succCb: () => {
              this.errMsg = '';
            },
            errCb: ( errmsg ) => {
              this.errMsg = errmsg;
            }
          };
        } );
      }
    }, { deep: true, immediate: true } );
  },
  methods:{
    handlerRegisterEvent() {
      this.$on( 'el.form.blur', () => {
        debugger;
      } );
      this.$on( 'el.form.change', () => {
      } );
    }
  },
  render( h ) {
    return h(
      'div',
      {
        attrs:{
          'aria-controls':this.errMsg
        },
        class: [
          this.errMsg && 'poptip-validate-err',
          'scm-form-validate'
        ].filter( Boolean )
      },
      this.$slots.default
    );
  }
};