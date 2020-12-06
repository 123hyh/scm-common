/*
 * @Author: your name
 * @Date: 2020-12-02 23:58:52
 * @LastEditTime: 2020-12-06 21:50:36
 * @LastEditors: Please set LastEditors
 * @Description: vue 公共组件
 * @FilePath: \scm_frontend_common\src\vue-component\index.ts
 */


/**
 * 组件size 
 * @description: 
 * @param {*}
 * @return {*}
 */
let _SIZE = 'small';

/**
 * 码值 api 接口
 * @description: 
 * @param {string} dictKeyword
 * @return {*}
 */
let _getCodeDict: ( dictKeyword: string ) => Promise<any> | any[] = ( keyword: string ) => [];

export default {
  install: function useScmComponent( _Vue: any, options: {
    size: 'medium' | 'small' | 'mini',
    dictRequest: ( dictKeyword: string ) => Promise<any> | any[]
  }
  ) {
    const { size = 'small', dictRequest } = options ?? {};
    _SIZE = size;
    if ( typeof dictRequest === 'function' ) {
      _getCodeDict = dictRequest;
    }
  }
};

export function getSize() {
  return _SIZE;
}
export function getCodeDict( keyword:string ) {
  return _getCodeDict( keyword );
}

/**
 * 表单组件
 * @description: 
 * @param {*}
 * @return {*}
 */
export { default as CombinationForm } from './Form/CombinationForm';

/**
 * 表格组件
 * @description: 
 * @param {*}
 * @return {*}
 */

export { default as CombinationTable } from './table/CombinationTable';
