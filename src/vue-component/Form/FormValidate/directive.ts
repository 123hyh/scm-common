/*
 * @Author: your name
 * @Date: 2020-12-27 09:42:26
 * @LastEditTime: 2020-12-28 11:28:54
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormValidate\directive.ts
 */
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { VNode } from 'vue/types/umd';
import { Collector } from './collector';
import './style/index.scss';

/**
 * 设置元素属性和添加样式
 * @param el 
 * @param msg 
 */
function setElemMsg( el: HTMLElement, msg: string ) {
  if ( msg ) {
    el.classList.add( 'poptip-validate-err' );
    el.setAttribute( 'aria-controls', msg );
  } else {
    el.classList.remove( 'poptip-validate-err' );
    el.removeAttribute( 'aria-controls' );
  }
}

/**
 * 添加rules
 * @param el 
 * @param bindValue 
 * @param vnode 
 */
function addRules( el:HTMLElement, bindValue:DirectiveBinding, vnode:VNode ) {
  const { field, rules, collector } = <any>bindValue;

  /* 收集器 */
  const collectorInstance: Collector = collector;
  const bindCom = vnode.componentInstance;

  /* 1、添加校验 */
  collectorInstance.addValidate( field, () => {
    return {
      value: ( <any>bindCom ).value,
      rules,
      errCb: ( msg: string ) => {
        setElemMsg( el, msg );
      },
      succCb: () => {
        setElemMsg( el, '' );
      }
    };
  } );
}


export const validate: DirectiveOptions = {
  inserted( el, bind, vnode ) {
    const { field,  collector: collector } = bind.value;

    addRules( el, bind.value, vnode );

    /* 收集器 */
    const collectorInstance: Collector = collector;
    const bindCom = vnode.componentInstance;
    const validate = () => collectorInstance.validate( [ field ] );

    /* 2、注册事件 */
    bindCom?.$on( 'input', () => {
      validate();
    } );
    bindCom?.$on( 'blur', () => {
      validate();
    } );
    bindCom?.$watch( 'value', ( v:string, old ) => {
      validate();
    }, {
      deep: true

      // immediate: true
    } );

  },
  update( el, bind, vnode ) {
    const { rules } = bind.value;

    /* 1、清空上次校验结果 */
    if ( Array.isArray( rules ) ) {
      rules.length === 0 && setElemMsg( el, '' );
    } else if ( typeof rules === 'object' ) {
      Object.keys( rules ).length === 0 && setElemMsg( el, '' );
    }

    addRules( el, bind.value, vnode );
  },
  unbind() {

  }
};

/**
 * 收集器
 */
export function useCollector() { 
  return new Collector();
}