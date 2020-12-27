/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:19:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-27 15:42:18
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
      label: 'label',
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
    formData: {
      type: Object,
      default: () => ( {} )
    },
    collector:{
      type:Object,
      required:false
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
        [

          /* 标题 */
          this.$slots.table_caption && h( 'caption', this.$slots.table_caption  ),
          ...this.schema.map( ( item, index ) =>
            h( 'TrItem', {
              key: index,
              props: {
                size: 'small',
                schema: item,
                formData: this.formData,
                collector: this.collector
              },
              on:{
                ...this.$listeners
              },
              scopedSlots: this.$scopedSlots
            } )
          ) ]
      )
    ] );
  }
};

/**
 * 查找 tableInput Schema 的 字段
 * @description: 
 * @param {*}
 * @return {*}
 */
export function pickTableInputSchemaItem( fields = [], tableInputSchema = [] ) {
  const fieldSets = new Set( fields );
  function handler( schema = [], results = {} ) {
    return schema.reduce( ( prev, item ) => {
      const type = Object.prototype.toString.call( item ).slice( 8, -1 );
      if ( type === 'Array' ) {
        prev = { ...prev, ...handler( item ) };
      } else if ( type === 'Object' && fieldSets.has( item.field )  ) {
        const { field } = item;
        const prevItem = prev[ field ];
        if ( prevItem ) {
          prev[ field ] = [ prevItem, item ];
        } else {
          prev[ field ] = item;
        }
      }
      return prev;
    }, results );
  }
  return handler( tableInputSchema );
}

