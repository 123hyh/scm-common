/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:19:20
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-24 20:22:18
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\index.js
 */
import './style/index.scss';

const schema = [
  [
    {
      rowspan: 2,
      field: 'text',
      type: 'select',
      options: [ { label: 1, value: 1 } ],
      key: 1,
      visible: true
    },
    {
      colspan: 2,
      field: 'sex',
      type: 'string',
      key: 2,
      visible: true
    },
    {
      rowspan: 2,
      field: 'sex',
      label:'label',
      type: 'text',
      key: 2,
      visible: true
    }
  ],
  [
    {
      field: 'age',
      type: 'slot',
      key: 2,
      visible: true
    },
    {
      field: 'name',
      key: 4,
      type: 'checkbox',
      options: [
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ],
      visible: true
    },
    {
      field: 'x',
      key: 5,
      type: 'select',
      options: [ { label: 1, value: 1 } ],
      visible: true
    }
  ]
];
import TrItem from './TrItem.js';
export default {
  name: 'ScmTableInput',
  components: {
    TrItem
  },
  props: {
    schema: {
      type: Array,
      default: () => schema
    },
    formData:{
      type: Object,
      default: () => ( {} )
    }
  },
  render( h ) {
    return h( 'div', { class: [ 'table-input-wrap' ] }, [
      h(
        'table',
        {
          attrs: {
            cellpadding: '0'
          },
          class: [ 'table-wrap' ]
        },
        this.schema.map( ( item, index ) =>
          h( 'TrItem', {
            key: index,
            props: {
              size: 'small',
              schema: item,
              formData: this.formData
            },
            scopedSlots: this.$scopedSlots
          } )
        )
      )
    ] );
  }
};