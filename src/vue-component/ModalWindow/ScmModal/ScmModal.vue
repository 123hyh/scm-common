<!--
 * @Author: your name
 * @Date: 2020-12-25 23:50:08
 * @LastEditTime: 2020-12-26 19:47:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\ModalWindow\ScmModal.vue
-->

<template>
  <ScmModal
    ref="scmModal"
    class="scm-modal-1206"
    v-bind="$attrs"
    :name="modalName"
    draggable=".window-header"
    :resizable="isFullScreen === false"
    adaptive
    reset
    :clickToClose="false"
    :scrollable="true"
    >
    <div
      ref="header"
      class="window-header"
      >
      <slot name="title"/>
      <!-- 右侧操作 -->
      <div class="right-layout">
        <!-- <div
          :class="{
            [isFullScreen ? 'modal-out-full-icon' : 'modal-full-icon']: true,
          }"
          @click.stop="handlerFullScreen"
          /> -->
        <div
          class="el-icon-close"
          @click.stop="() => $emit('close')"
          />
      </div>
    </div>
    <div :style="{ height: contentHeight, overflow: 'auto' }">
      <slot/>
    </div>
    <div
      ref="footer"
      class="window-footer"
      >
      <slot name="footer"/>
    </div>
  </ScmModal>
</template>

<script>

/**
 * 当前计数器
 */
let counter = 0;
import VModal from 'vue-js-modal';
import Vue from 'vue';
import { debounce } from 'lodash-es';
import ResizeObserver from 'resize-observer-polyfill';

Vue.use( VModal, {
  componentName: 'ScmModal',
  draggable: true,
  resizable: true,
  height: 'auto'
} );

export default {
  name: 'ScmModalCom',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalName: `scmModal_${counter++}`,

      /**
       * 内容高度
       */
      contentHeight: '',

      /**
       * 是否全屏
       */
      isFullScreen: false
    };
  },
  mounted() {
    this.$modal.show( this.modalName );
    this.handlerContentHeight();
  },
  methods: {
    getMarginY( el ) {
      const { marginBottom, marginTop, bottom } = getComputedStyle( el );
      return `${marginTop} - ${marginBottom} - ${
        bottom === 'auto' ? '0px' : bottom
      }`;
    },

    /**
     * 修改content 高度
     * @description:
     * @param {*}
     * @return {*}
     */
    get handlerContentHeight() {
      return function () {
        const ro = new ResizeObserver(
          debounce( () => {
            const { header, footer, scmModal } = this.$refs;
            const modal = scmModal?.$refs?.modal;
            if ( modal ) {
              const { offsetHeight: mHeight } = modal;
              const { offsetHeight: fHeight } = footer;
              const { offsetHeight: hHeight } = header;

              this.contentHeight = `calc( ${
                mHeight - fHeight - hHeight
              }px - ${this.getMarginY( header )} - ${this.getMarginY( footer )})`;
            }
          }, 10 )
        );
        setTimeout( () => {
          const target = this.$refs.scmModal.$refs.modal;
          target && ro.observe( target );
        } );
      };
    },

    /**
     * 点击全屏
     */
    get handlerFullScreen() {
      let prevSize = {
        width: 0,
        height: 0
      };
      const fullStyleText = 'top: 1%; left: 1%; width: 99%; height: 99%';
      return function () {
        this.isFullScreen = !this.isFullScreen;
        const target = this.$refs.scmModal.$refs.modal;
        if ( target ) {
          if ( this.isFullScreen ) {
            prevSize = target.style.cssText;
            target.style.cssText = fullStyleText;
          } else {
            target.style.cssText = prevSize;
          }
        }
      };
    }
  }
};
</script>

<style scoped lang='scss'>
::v-deep.window-header {
  position: relative;
  box-sizing: border-box;
  padding: 10px 5px;
  margin: 0;
  color: #6b6b6b;
  border-bottom: 1px solid #f0f0f0;
  .right-layout {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    position: absolute;
    .el-icon-close {
      font-size: 22px;
      cursor: pointer;
    }
  }
}
::v-deep .window-footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>