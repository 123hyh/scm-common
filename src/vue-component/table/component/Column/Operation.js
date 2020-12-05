/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 16:49:17
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-26 09:57:40
 * @Description:
 * @FilePath: \customs\src\components\common\Table\component\Column\Operation.js
 */

import { cloneDeepWith } from 'lodash-es';
export default {
  functional: true,
  render( _, ctx ) {
    const { parent, data: { props: { schema = {} } = {} } } = ctx;
    return parent.$createElement(
      'el-table-column',
      {
        props: {
          'class-name': 'scm-table-column-operation',
          label: parent.$t( schema.label ) ?? '操作',
          width: schema.width,
          fixed: 'right',
          align: schema.align ?? 'center'
        },
        scopedSlots: {
          default: ( props ) => {
            return parent.$scopedSlots.operation( cloneDeepWith( props.row ) );
          }
        }
      }
    );
  }
};
