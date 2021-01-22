
/*
 * @Author: huangyuhui
 * @Date: 2020-12-02 19:03:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-22 18:56:05
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

/**
 * 判断当前浏览器是否支持webp图片格式
 */
export const isSupportWebp = () => {
  return new Promise( ( resolve, reject ) => {
    const base64 = 'UklGRs4BAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSMkAAAABJ8KgbSRH7/nr940/3+cQEXlIKUqiCKbUrScjrq9qG8VSxpAiZ8NGu4cfHEaSbVrzbH3btu3/80/qnZ9DRP8nACBobt/vTTNANGb3VtG2i637zAC089JGtJcnDYZThb/KdET41IHa5dZXwXxE7R4Qf8ulax3otY85oDKAyRjInT4uYvZXBrzPxxcyrypA8DnmhM6KdP7U6QqFotDthHcjtdmnjHvIcJpKEkBZjEA7rB1EZ33QAGN+bxUtq9i6zw3EoLG73TbNAAAAVlA4IN4AAAAQBgCdASoQABAAAgA0JZQCdBPJ/0/MZ44DRAMbCzBPOHsB/wz+cf7zrAfqB7AH6jGsUtAxgPcFgAAA/u0sTus4gwhBmuaPLY7AUfhpe/KzMtOIIoJGT7/nn+9oXrErUz4tkBWAbqyg2N1LiG/jzcRYVBxwgvqRqk+fGLyCT8YrYu15wm+vwmZu19tQpjkUysoo7Vfr3kv3tlrNa/WQTJB35YaYviZewny3sVjX/uS/C5AbEd0j+/5hnlecnrfN3+PFRHkj36oZ6xYkZLQvK8+z5gTdpg0zgtfJ+zCogAA=';
    const image = new Image();
    image.onload = function () {
      resolve( true );
    };
    image.onerror = function () {
      reject();
    };
    image.src = `data:image/webp;base64,${base64}`;
  } );
};

export { when, useLiabilityChain, useComposite } from './designPatterns';
