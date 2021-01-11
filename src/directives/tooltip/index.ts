/*
 * @Author: your name
 * @Date: 2021-01-03 20:22:10
 * @LastEditTime: 2021-01-11 20:07:22
 * @LastEditors: huangyuhui
 * @Description: tooltip 指令
 * @FilePath: \scm_frontend_common\src\directives\tooltip\index.ts
 */
import './index.scss';
import { Tooltip } from 'element-ui';
import Vue, { DirectiveOptions } from 'vue';

const toolTipCom = () => Vue.extend( {
  name: 'ToolTipDirective',
  components: {
    ElTooltip: Tooltip
  },
  data: () => ( {
    content: '',
    value: false
  } ),
  deactivated() {

    /* 隐藏 tip */
    this.value = false;
  },
  methods: {
    setValue( value:boolean, content:string = '' ) {
      this.value = value;
      this.content = content;
    }
  },
  render( h ) {
    return h( 'ElTooltip', {
      ref: 'tooltip',
      props: {
        popperClass:'customer-tooltip-directive_err',
        content: this.content,
        placement: 'top-start',
        manual: true,
        value: this.value
      }
    }, [ h( 'div' ) ] );
  }
} );

const cache = new Map<string, any>();


export const tooltip: DirectiveOptions = {
  bind( el, bind, vnode ) {
    if ( bind.arg === undefined ) {
      return console.error( '钩子 --- 「bind」请传入指令 arg参数，参数为field' );
    }
    const CurrentCom = toolTipCom();
    cache.set( `${( <any>vnode.context )._uid}_${bind.arg}`, new CurrentCom().$mount() );
  },
  inserted( el, bind, vnode ) {
    if ( bind.arg === undefined ) {
      return console.error( '钩子 --- 「inserted」请传入指令 arg参数，参数为field' );
    }
    const comInstance = cache.get( `${( <any>vnode.context )._uid}_${bind.arg}` );
    const { value, content } = bind.value;
    comInstance.setValue( value, content );
    const parentElem = el.parentElement;
    comInstance.$el.appendChild( el );

    // parentElem?.replaceChild( comInstance.$el, el );

    parentElem?.appendChild( comInstance.$el );
  },
  // eslint-disable-next-line max-params
  update( el, bind, vnode, oldvnode ) {
    if ( bind.arg === undefined ) {
      return console.error( '钩子 --- 「update」请传入指令 arg参数，参数为field' );
    }
    console.log( ( <any>vnode.context )._uid );
    const comInstance = cache.get( `${( <any>vnode.context )._uid}_${bind.arg}` );
    const { value, content } = bind.value;
    comInstance.setValue( value, content );

  },
  unbind( el, bind, vnode ) {
    if ( bind.arg === undefined ) {
      return console.error( '钩子 --- 「unbind」请传入指令 arg参数，参数为field' );
    }
    cache.delete( `${( <any>vnode.context )._uid}_${bind.arg}` );
  }
};