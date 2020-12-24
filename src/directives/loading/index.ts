/*
 * @Author: huangyuhui
 * @Date: 2020-12-24 12:26:19
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-24 14:01:57
 * @Description: 加载动画
 * @FilePath: \scm_frontend_common\src\directives\loading\index.ts
 */
import './index.scss';

import Vue, { DirectiveOptions } from 'vue';

const LoadingElem = Vue.extend( {
  render( h ) {
    return h( 'div', { class: [ 'load-wrap' ] }, [
      h( 'div', {
        class: [ 'load-container' ]
      }, [
        h( 'div', {
          class: [ 'load', 'load1' ]
        } ),
        h( 'div', {
          class: [ 'load', 'load2' ]
        } ),
        h( 'div', {
          class: [ 'load' ]
        } )
      ] )
    ] );
  }
} );
const elemMap = new WeakMap();

/**
 * 加载动画指令
 * @description: 
 * @param {*}
 * @return {*}
 */
export const loading: DirectiveOptions = {
  inserted( el: HTMLElement, binding, vnode ) {
    const { value } = binding;
    const { $el } = new LoadingElem().$mount();
    elemMap.set( el, $el );
    if ( value ) {
      el.classList.add( 'relative-container' );
    } else {
      $el.classList.add( 'hide-load' );
      el.classList.remove( 'relative-container' );
    }
    el.appendChild( $el );
  },
  update( el: HTMLElement, binding ) {
    const { value } = binding;
    const $el = elemMap.get( el );
    if ( value === false ) {
      $el.classList.add( 'hide-load' );
      el.classList.remove( 'relative-container' );
    } else {
      $el.classList.remove( 'hide-load' );
      el.classList.add( 'relative-container' );
    }
  },
  unbind( el, _, vnode ) {
    vnode.context?.$once( 'hook:beforeDestroy', () => {
      elemMap.delete( el );
    } );
    elemMap.delete( el );
  }
};
