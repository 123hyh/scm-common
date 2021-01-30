/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 15:35:45
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-28 19:02:04
 * @Description: table column 组件
 * @FilePath: \scm_frontend_common\src\vue-component\table\component\Column\index.js
 */
import {  TableColumn, Tooltip } from 'element-ui';
import { UTableColumn } from 'umy-ui';
const getText = ( key, i18nHandler ) => key && i18nHandler ? i18nHandler( key ) : key;
let keyCounter = 0;

export default {
  abstract: true,
  name: 'SCMTableColumn',
  components: {
    ElTableColumn: TableColumn,
    ElTooltip: Tooltip,
    UxTableColumn: UTableColumn
  },
  props: {

    /* 表格配置 */
    columnSchema: {
      type: Object,
      required: true
    },

    /* slots透传 */
    columnSlots: {
      type: Object,
      required: true
    }
  },
  render( h ) {
    const {
      field,
      fixed,
      sortable,
      label,
      width,
      children = [],
      align = 'center',
      tip

    } = this.columnSchema;
    return h(
      'UxTableColumn',
      {
        props: {
          align,
          prop: field,
          key: `${field}_${keyCounter++}`,
          fixed: typeof fixed === 'string' && fixed !== '' ? fixed : undefined,
          sortable: sortable,
          label: getText( label, this?.$t?.bind( this ) ),
          'show-overflow-tooltip': true,
          width
        },
        scopedSlots: ( () => {
          const slots = {};
          slots.default = props => {
            const { row, column, $index } = props;

            /* 点击列 时 修改 可编辑状态 */
            return h(
              'span',
              [
                this.columnSlots[ field ]
                  ? this.columnSlots[ field ]( row, column, $index )
                  : row[ field ]
              ]
            );
          };

          /* tip 字段 插槽 */
          if ( tip ) {
            slots.header = () =>
              h(
                'el-tooltip',
                {
                  props: {
                    'popper-class': `scm-table-column-header-tip-${ field }`,
                    content: getText( tip, this?.$t?.bind( this ) ) 
                  }
                },
                [
                  h( 'span', { class: [ 'scm-table-header-label' ] }, [
                    h( 'span', getText( label, this?.$t?.bind( this ) )  ),
                    h( 'i', {
                      class: [ 'el-icon-question', 'tip-icon' ]
                    } )
                  ] )
                ]
              );
          }
          return slots;
        } )()
      },
      [
        children &&
          children.length &&
          children.map( item => {
            return h( 'SCMTableColumn', {
              key:`${item.field}_${keyCounter++}`,
              props: {
                columnSchema: item,
                columnSlots: this.columnSlots
              }
            } );
          } )
      ].filter( Boolean )
    );
  }
};
