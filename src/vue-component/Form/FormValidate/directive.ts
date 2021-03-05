/*
 * @Author: your name
 * @Date: 2020-12-27 09:42:26
 * @LastEditTime: 2021-03-05 10:44:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormValidate\directive.ts
 */
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { VNode } from 'vue/types/umd';
import { Collector } from './collector';
import { tooltip } from '../../../directives';

/**
 * 设置元素属性和添加样式
 * @param el 
 * @param msg 
 */
function setElemMsg( el: HTMLElement, data: { field: string, msg?: string }, vnode:VNode ) {
  ( <any>tooltip ).update( el, 
    { value: { value: !!data.msg, content: data.msg }, arg: data.field },
    vnode
  );
}

/**
 * 添加rules
 * @param el 
 * @param bindValue 
 * @param vnode 
 */
function addRules( el: HTMLElement, bindValue: DirectiveBinding, vnode: VNode ) {
  const { field, rules, collector, data, fixed = false } = <any>bindValue;
  const hashData = Object.prototype.hasOwnProperty.call( bindValue, 'data' );

  /* 收集器 */
  const collectorInstance: Collector = collector;
  const bindCom = vnode.componentInstance;

  /* 1、添加校验 */
  collectorInstance.addValidate( field, () => {
    return {

      // value 如果有传入则使用传入的，否则使用 当前绑定组件
      value: hashData ? data : ( <any>bindCom ).value,
      rules,
      errCb: ( msg: string ) => {

        setElemMsg( el, { field, msg }, vnode );
      },
      succCb: () => {

        setElemMsg( el, { field, msg: '' }, vnode );
      }
    };
  } );
}


export const validate: DirectiveOptions = {
  bind( el, bind, vnode ) {
    ( <any>tooltip ).bind( el, { value: bind.value, arg: bind.value.field }, vnode );
  },
  inserted( el, bind, vnode ) {
    const { field, collector: collector } = bind.value;
    ( <any>tooltip ).inserted( el, { value: bind.value, arg: field }, vnode );

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
    bindCom?.$watch( 'value', ( v: string, old ) => {
      validate();
    }, {
      deep: true

      // immediate: true
    } );

  },
  // eslint-disable-next-line max-params
  update( el, bind, vnode ) {

    const { rules, field } = bind.value;
    ( <any>tooltip ).update( el, { value: bind.value, arg: field }, vnode );

    /* 1、清空上次校验结果 */
    if ( Array.isArray( rules ) ) {
      rules.length === 0 && setElemMsg( el, { field: bind.value.field, msg: '' }, vnode );
    } else if ( typeof rules === 'object' ) {
      Object.keys( rules ).length === 0 && setElemMsg( el, { field: bind.value.field, msg: '' }, vnode );
    }

    addRules( el, bind.value, vnode );
  },
  unbind( el, bind, vnode ) {

    const { collector, field } = bind.value;
    ( <any>tooltip ).unbind( el, { value: bind.value, arg: field }, vnode );
    collector.unValidate( field );
  }
};

/**
 * 收集器
 */
export function useCollector() {
  return new Collector();
}