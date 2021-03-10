/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:13:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-10 17:55:56
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Switch.js
 */
import { debounce } from 'lodash-es';
import { Switch } from 'element-ui';
import { mergeCustomEvents } from './utils';

export default {
  abstract: true,
  components:{
    ElSwitch: Switch
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
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
      disabled = false,
      field
    } = this.conf;
    return h(
      'el-switch',
      {
        props: {
          value: this.value,
          disabled,
          activeColor: '#13ce66'
        },
        attrs: {
          name: field
        },
        on: mergeCustomEvents.call( this )
      }
    );
  }
};
