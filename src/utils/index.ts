
/*
 * @Author: huangyuhui
 * @Date: 2020-12-02 19:03:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-21 18:54:36
 * @Description: 工具函数
 * @FilePath: \scm_frontend_common\src\utils\index.ts
 */

/**
 * 转驼峰
 * @description: 
 * @param {*}
 * @return {*}
 */ 
export { default as camelCaseKeys } from './object/camelCaseKeys/index';

export { forEachObject } from './object';


/**
 * 判断是否为空的数据
 * @description:
 * @param {*}
 * @return {*}
 */

export function isEmpty( data: any ) {
  return data === undefined || data === null || data === '' || Number.isNaN( data );
}


/**
 * 指定dom节点 向下查找指定节点
 * @description: 
 * @param { HTMLElement } node 开始查找的节点
 * @param {(node: HTMLElement) => boolean} condition 条件回调方法
 * @return {HTMLElement | undefined}
 */
export function findDomNode( node:Element, conditionCb:( elem:Element )=> boolean ) {
  return [ ...node.children ].reduce<Array<Element>>( ( prev, item ) => {
    const target = conditionCb( item );
    if ( target ) {
      prev.push( item );
    } else {
      prev.push( ...findDomNode( item, conditionCb ) );
    }
    return prev;
  }, [] );
}
export { when, useLiabilityChain, useComposites } from './designPatterns';