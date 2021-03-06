/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 16:18:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-01 10:21:00
 * @Description:
 * @FilePath: \scm_frontend_common\src\utils\object\index.ts
 */

import { omitBy as _omitBy } from 'lodash-es';

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export function forEachObject<T extends Object>(
  object: T,
  handler: ( key: string, value: any ) => { [propName: string]: any } | void
) {
  let newData: { [propName: string]: any } = {};
  for ( const key in object ) {
    if ( Object.prototype.hasOwnProperty.call( object, key ) ) {
      const data = handler( key, object[ key ] );
      newData = {
        ...newData,
        ...( data ?? {} )
      };
    }
  }
  return newData;
}

function _filterObject<T>(
  originalObject: { [index: string]: T },
  keys: string[],

  /* 是否为忽略 */

  isOmit = true
) {
  return _omitBy<T>(
    originalObject,
    ( () => {
      const notKeys = new Set( keys );
      return ( _: any, key: string ) => notKeys.has( key ) === isOmit;
    } )()
  );
}

/**
 * 忽略对象的某些属性
 * @description:
 * @param {T} obj 元对象
 * @param { string[] } keys 需要排除的 属性集合
 * @return {*}
 */
export function omitObjBy<T>(
  originalObject: { [index: string]: T },
  keys: string[] = []
) {
  return _filterObject<T>( originalObject, keys );
}

/**
 * 查找对象中的某些属性
 * @description:
 * @param {object} originalObject
 * @param {string} keys
 * @return {*}
 */
export function findObjBy<T>(
  originalObject: { [index: string]: T },
  keys: string[]
) {
  return _filterObject( originalObject, keys, false );
}

/**
 * 对象 字段字符串 去空格
 * @param fileds 操作的字段
 * @param hasField 是否 需要 字段
 * @returns
 */
export function trimObjectSpace( fileds: string[], hasField = true ) {
  const fieldsSet = new Set( fileds );
  return {
    normalize: ( object: { [prop: string]: any } ) =>
      forEachObject( object, ( k, v ) => ( {
        [ k ]:
          fieldsSet.has( k ) === hasField && typeof v === 'string'
            ? ( v ?? '' ).trim()
            : v
      } ) )
  };
}

type FlatListWhileCallbackType<T> = ( item: T ) => T[] | void;

/**
 * 扁平化数组
 * @param list
 * @param getChildren
 * @returns
 */
export function flatListWhile<T>(
  list: T[],
  getChildren: FlatListWhileCallbackType<Partial<T>>
) {
  const newList: T[] = [];
  list.forEach( ( item ) => {
    newList.push( item );
    const children = getChildren( item );
    if ( Array.isArray( children ) ) {
      newList.push( ...flatListWhile( children as T[], getChildren ) );
    }
  } );
  return newList;
}