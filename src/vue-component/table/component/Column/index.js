/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 15:35:45
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-24 16:04:32
 * @Description: table column 组件
 * @FilePath: \customs\src\components\common\Table\component\Column\index.js
 */
import Vue from 'vue';
import { cloneDeepWith } from 'lodash-es';
import { Popover, TableColumn, Tooltip } from 'element-ui';
import ColumnEdit from './Edit';

const cacheMap = Vue.observable( {
  activeEdit: null,
  closeEdit() {
    if ( cacheMap.activeEdit ) {
      console.log( 1 );
      cacheMap.activeEdit.editble = false;
      cacheMap.activeEdit.$refs.editPopover.showPopper = false;
    }
  }
} );

export default {
  abstract: true,
  name: 'SCMTableColumn',
  components: {
    Popover,
    ColumnEdit,
    ElTableColumn: TableColumn,
    ElTooltip: Tooltip
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
  data() {
    return {

      /* 是否处于编辑状态 */
      editble: false
    };
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
      tip,

      /* 列 编辑选项 */
      input
    } = this.columnSchema;
    return h(
      'el-table-column',
      {
        props: {
          align,
          prop: field,
          fixed: typeof fixed === 'string' && fixed !== '' ? fixed : undefined,
          sortable: sortable ? 'custom' : sortable,
          label: this.$t( label ),
          'show-overflow-tooltip': true,
          width
        },
        scopedSlots: ( () => {
          const slots = {};
          slots.default = props => {
            const { row } = props;

            /* 点击列 时 修改 可编辑状态 */
            return h(
              'span',
              {
                on: {
                  click: e => {

                    // e.stopPropagation();
                    this.editble = true;

                    /* 保存当前 到激活的 edit */
                    cacheMap.activeEdit = this;
                  }
                }
              },
              [
                this.columnSlots[ field ]
                  ? this.columnSlots[ field ]( row, {

                    /* 传入 编辑状态到 列插槽 */
                    editble: this.editble
                  } )
                  : ( () => {
                    if ( input ) {
                      return h(
                        'Popover',
                        {
                          ref: 'editPopover',
                          props: {
                            title: `修改${ label }`,
                            trigger: 'click',
                            'popper-class': 'scm-table-column-edit-popper'
                          },
                          on: {
                            show: () => {
                              this.editble = true;
                            },
                            hide: () => {
                              this.editble = false;
                              cacheMap.activeEdit = null;
                            }
                          }
                        },
                        [
                          h(
                            'span',
                            {
                              slot: 'reference'
                            },
                            row[ field ]
                          ),

                          /* 列编辑组件 */
                          this.editble &&
                              input &&
                              h( 'ColumnEdit', {
                                props: {
                                  field,
                                  schema: input,
                                  editble: this.editble,
                                  sourceData: row[ field ]
                                },
                                on: {
                                  updateColumn: e => {
                                    this.$emit( 'updateColumn', {
                                      row: cloneDeepWith( row ),
                                      data: e
                                    },

                                    /* 关闭 编辑popover回调 */
                                    function closePopover() {
                                      this.editble = false;
                                    }.bind( this )
                                    );
                                  },
                                  'update:editble': () => {
                                    this.editble = !this.editble;
                                  }
                                }
                              } )
                        ].filter( Boolean )
                      );
                    } else {
                      return row[ field ];
                    }
                  } )()
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
                    content: this.$t( tip )
                  }
                },
                [
                  h( 'span', { class: [ 'scm-table-header-label' ] }, [
                    h( 'span', this.$t( label ) ),
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
