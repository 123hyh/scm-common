/*
 * @Author: huangyuhui
 * @Date: 2020-12-29 14:57:03
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-29 15:11:34
 * @Description: 表格输入组件 schema 方法
 * @FilePath: \scm_frontend_common\src\vue-component\TableInput\utils.ts
 */

/**
 * 挑选 表格输入schemaItem 自行判断方法
 * @param {function} conditionFn 条件回调，每次传入item
 * @param {object[][]} tableInputSchema  表格输入schema
 */
export function selfPickTableInputSchemaItem(
  conditionFn: ( item: {[prop:string]:any} ) => boolean,
  tableInputSchema:object[][] = []
) {
  if ( typeof conditionFn !== 'function' ) {
    throw new Error( 'selfPickTableInputSchemaItem方法 的conditionFn 参数比传入回调函数' );
  }
  function handler( schema:object[] | object[][] = [], results = {} ) {
    return ( <any[]>schema ).reduce<{[prop:string]:object}>( ( prev, item ) => {
      const type = Object.prototype.toString.call( item ).slice( 8, -1 );
      if ( type === 'Array' ) {
        prev = { ...prev, ...handler( item ) };
      } else if ( type === 'Object' && conditionFn( item ) ) {
        const { field } = item;
        const prevItem = prev[ field ];
        if ( prevItem ) {
          prev[ field ] = [ prevItem, item ];
        } else {
          prev[ field ] = item;
        }
      }
      return prev;
    }, results );
  }
  return handler( tableInputSchema );
}

/**
 * 查找 tableInput Schema 的 字段
 * @description: 
 * @param { string[] } fields 需要查找的字段集合
 * @param { object[][] } tableInputSchema 表格输入组件的schema
 * @return {*}
 */
export function pickTableInputSchemaItem( fields:string[] = [], tableInputSchema:object[][] = [] ) {
  const fieldSets = new Set( fields );
  return selfPickTableInputSchemaItem( ( item ) => {
    return fieldSets.has( ( <any>item ).field );
  }, tableInputSchema );
}
