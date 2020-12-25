<!--
 * @Author: your name
 * @Date: 2020-12-25 23:50:08
 * @LastEditTime: 2020-12-26 02:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\ModalWindow\ScmModal.vue
-->

<template>
  <ScmModal
    ref="scmModal"
    v-bind="$attrs"
    :name="modalName"
    draggable=".window-header"
    resizable
    adaptive
    reset
    :clickToClose="false"
    :scrollable="true"
    >
    <p
      ref="header"
      class="window-header"
      >
      <slot name="title"/>
    </p>
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
      contentHeight: ''
    };
  },
  mounted() {
    this.$modal.show( this.modalName );
    this.handlerContentHeight();
  },
  methods: {
    getMarginY( el ) {
      const { marginBottom, marginTop, bottom } = getComputedStyle( el );
      return `${marginTop} - ${marginBottom} - ${bottom === 'auto' ? '0px' : bottom }`;
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
              const { offsetHeight:mHeight } = modal;
              const { offsetHeight:fHeight }  = footer;
              const { offsetHeight:hHeight }  = header;

              this.contentHeight = `calc( ${
                mHeight - fHeight - hHeight
              }px - ${this.getMarginY( header )} - ${
                this.getMarginY( footer )
              })`;

            }
          }, 10 )
        );
        setTimeout( () => {
          const target = this.$refs.scmModal.$refs.modal;
          target && ro.observe( target );
        } );
      };
    }
  }
};
</script>

<style scoped lang='scss'>
::v-deep.window-header {
  box-sizing: border-box;
  margin: 10px 5px;
  color: #6b6b6b;
}
::v-deep .window-footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>