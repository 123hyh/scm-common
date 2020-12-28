
/*
 * @Author: your name
 * @Date: 2020-12-26 01:55:49
 * @LastEditTime: 2020-12-26 19:50:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\ModalWindow\ScmModal\index.d.ts
 */

/**
 * 模态窗组件
 */
const ScmModal: {
  props: {
    /**
     * 模态窗宽度
     */
    width: [number, string],
    /**
     * 模态窗高度
     */
    height: [number, string],
    /**
     * 是否显示模态窗
     */
    visible: boolean,
    /**
     * 缓存组件
     */
    cached: boolean
  },
  listeners: {
    /**
     * 关闭模态窗事件
     */
    close: () => void
  },
  slots: {
    /**
     * 标题插槽
     */
    title: any,
    /**
     * 中间内容插槽
     */
    default: any
    /**
     * 底部插槽
     */
    footer: any,
  }
}

export default ScmModal