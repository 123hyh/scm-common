/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 19:19:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-24 18:41:58
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\index.js
 */

/**
 * 组件使用次数计数器
 */
let useComCounter = 0;
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
  get render() {
    let _useComCounter = useComCounter++;
    return function render( h ) {
      const currentKey = index => `${_useComCounter}-tr-${index}`;
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
                key: currentKey( index ),
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
    };
  }
};

// /**
//  * 挑选 表格输入schemaItem 自行判断方法
//  * @param {function} conditionFn 条件回调，每次传入item
//  * @param {object[][]} tableInputSchema  表格输入schema
//  */
// export function selfPickTableInputSchemaItem( conditionFn, tableInputSchema = [] ) {
//   if ( typeof conditionFn !== 'function' ) {
//     throw new Error( 'selfPickTableInputSchemaItem方法 的conditionFn 参数比传入回调函数' );
//   } 
//   function handler( schema = [], results = {} ) {
//     return schema.reduce( ( prev, item ) => {
//       const type = Object.prototype.toString.call( item ).slice( 8, -1 );
//       if ( type === 'Array' ) {
//         prev = { ...prev, ...handler( item ) };
//       } else if ( type === 'Object' && conditionFn( item ) ) {
//         const { field } = item;
//         const prevItem = prev[ field ];
//         if ( prevItem ) {
//           prev[ field ] = [ prevItem, item ];
//         } else {
//           prev[ field ] = item;
//         }
//       }
//       return prev;
//     }, results );
//   }
//   return handler( tableInputSchema );
// }

// /**
//  * 查找 tableInput Schema 的 字段
//  * @description: 
//  * @param { string[] } fields 需要查找的字段集合
//  * @param { object[][] } tableInputSchema 表格输入组件的schema
//  * @return {*}
//  */
// export function pickTableInputSchemaItem( fields = [], tableInputSchema = [] ) {
//   const fieldSets = new Set( fields );
//   return selfPickTableInputSchemaItem( ( item ) => {
//     return fieldSets.has( item.field );
//   }, tableInputSchema );
// }
export * from './utils';