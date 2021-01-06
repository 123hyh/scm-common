/*
 * @Author: huangyuhui
 * @Date: 2021-01-06 14:19:47
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-06 15:50:21
 * @Description: 状态 组件
 * @FilePath: \scm_frontend_common\src\vue-component\StatusTag\index.js
 */

import './index.scss';

const CLASS_NAME = {
  default:'default',
  success:'success',
  process:'processing',
  warning:'warning',
  error: 'error'
};

export default {
  functional: true,
  render( _, context ) {
    const { props : {
      type = 'default'
    }, parent } = context;
    const h = parent.$createElement;
    return [
      h( 'span', {
        class:[ 'scm-badge-status-dot',  `scm-badge-status-${CLASS_NAME[ type ]}` ]
      } ),
      context.scopedSlots.default()
    ];
  }
};