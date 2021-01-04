/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:17:47
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-04 19:42:39
 * @Description:
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormItem\Date.js
 */
import { debounce } from 'lodash-es';
import { DatePicker } from 'element-ui';
import { validate } from '../FormValidate/directive';

export default {
  abstract: true,
  components:{
    ElDatePicker: DatePicker
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: [ String, Array ],
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
  methods: {
    get emit() {
      return debounce( function ( data ) {
        this.$emit( 'change', data );
      }, 200 );
    }
  },
  directives: {

    /* 校验输入 */
    validate
  },
  render( h ) {
    const {
      field = '',
      disabled = false,
      clearable = false,
      dateType = 'date',
      valueFormat = 'yyyy-MM-dd',
      format = 'yyyy-MM-dd',
      placeholder = '',
      startPlaceholder	= '',
      endPlaceholder	= '',
      rules = {}
    } = this.conf;
    return h(
      'el-date-picker',
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
          disabled,
          clearable,
          type: dateType,
          format,
          'value-format': valueFormat,
          appendToBody: false,
          'popper-class': `date-item-${ field }`,
          'start-placeholder': this.entity
            ? this.$t( `${ this.entity }.${ startPlaceholder }` )
            : startPlaceholder,
          'end-placeholder': this.entity
            ? this.$t( `${ this.entity }.${ endPlaceholder }` )
            : endPlaceholder
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
      }
    );
  }
};
