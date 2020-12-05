/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 16:49:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 22:49:38
 * @Description:
 * @FilePath: \customs\src\components\common\Table\component\Column\Operation.js
 */

import { cloneDeepWith } from 'lodash-es';

const getText = ( key, i18nHandler ) => key && i18nHandler  ? i18nHandler( key ) : key;

export default {
  functional: true,
  render( _, ctx ) {
    const { parent, data: { props: { schema = {} } = {} } } = ctx;
    const _i18n$T = parent?.$t?.bind( parent );

    return parent.$createElement(
      'el-table-column',
      {
        props: {
          'class-name': 'scm-table-column-operation',
          label: _i18n$T ? getText( schema?.label, _i18n$T ) : '操作',
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
