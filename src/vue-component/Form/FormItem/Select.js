/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:12:52
 * @Description:
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormItem\Select.js
 */
import { debounce } from 'lodash-es';
import { Select, OptionGroup, Option } from 'element-ui';
import { validate } from '../FormValidate/directive';
import { mergeCustomEvents } from './utils';
export default {
  abstract: true,
  components: {
    ElSelect: Select,
    ElOptionGroup: OptionGroup,
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
      }, 100 );
    }
  },
  render( h ) {
    const {
      field = '',
      disabled = false,
      clearable = false,
      multiple = false,
      loading = false,
      placeholder = '',
      options = [],
      'collapse-tags': 
      collapseTags = false,
      rules = {}
    } = this.conf;
    return h(
      'el-select',
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
          filterable: true,
          popperAppendToBody: false,
          multiple,
          disabled,
          clearable,
          'collapse-tags': collapseTags,
          loading
        },
        attrs: {
          placeholder: this.entity
            ? this.$t( `${this.entity}.${placeholder}` )
            : placeholder,
          name: field,
          id: field
        },
        on: mergeCustomEvents.call( this )
      },
      options.map(
        ( item ) => {
          const isCombination = Array.isArray( item?.options );
          return isCombination ? 
            generateCombination( h.bind( this ), item ) :
            generateOption( h.bind( this ), item );
        }
      )
    );
  }
};

function generateCombination( h, options ) {
  const { label, options:children, disabled = false } = options;
  return h( 'ElOptionGroup', {
    props:{
      label,
      disabled
    }
  }, children.map( item => generateOption( h, item  ) ) );
}
function generateOption( h, item ) {
  const { label, value, disabled = false } = item;
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