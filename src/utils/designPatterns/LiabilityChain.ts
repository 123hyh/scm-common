/*
 * @Author: huangyuhui
 * @Date: 2021-01-20 15:37:43
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-20 15:40:25
 * @Description: 设计模式
 * @FilePath: \scm_frontend_common\src\utils\designPatterns\LiabilityChain.ts
 */

type callbackFnType<T> = ( data: any, next: () => void ) => T;
type LiabilityChainHandler = callbackFnType<void> | callbackFnType<Promise<boolean>>

abstract class LiabilityChainBaseData {
  protected handlers: { condtionFns: Array<LiabilityChainHandler>, [Symbol.asyncIterator]: any }

  constructor() {
    this.handlers = {
      condtionFns: [],
      [ Symbol.asyncIterator ]() {
        const ctx = this;
        let index = 0;
        return {
          async next() {
            const ret = {
              value: ctx.condtionFns[ index ],
              done: !!( index >= ctx.condtionFns.length )
            };
            index++;
            return ret;
          }
        };
      }
    };
  }

  /**
   * 开始进行
   * @description: 
   * @param {*}
   * @return {*}
   */
  public async exec( params: any ) {

    for await ( const handler of this.handlers ) {
      let isExecNext = false;
      await handler( params, function next() {
        isExecNext = true;
      } );
      if ( isExecNext === false ) {
        break;
      }
    }
  }
}

/**
 * 责任链 模式
 */
class LiabilityChain extends LiabilityChainBaseData {

  /**
   * 条件调用
   * @description: 
   * @param {*}
   * @return {*}
   */
  public static when = function when(
    codition: boolean,
    ...execCbs: Array<() => void>
  ) {
    if ( codition ) { execCbs.forEach( cb => cb() ); }
    return LiabilityChain;
  }

  constructor() {
    super();
  }


  /**
   * 追加 判断链
   * @param { (data:any, next:()=>void) => boolean } handler  
   * @return { LiabilityChain }
   */
  public setNextSuccessor( handler: LiabilityChainHandler ) {
    this.handlers.condtionFns.push( handler );
    return this;
  }
}

/**
 * 责任链 模式
 * @description: 
 * @param {*}
 * @return {*}
 */
export function useLiabilityChain() {
  return new LiabilityChain();
}

/**
 * 条件执行
 * @description: 
 * @param {boolean} codition
 * @param {function} execCb
 * @return {*}
 */
export function when( codition: boolean, ...execCbs: Array<() => void> ) {
  return LiabilityChain.when( codition, ...execCbs );
}

/**
 * @example
 */
/* const chain = new LiabilityChain();
chain.setNextSuccessor( ( data, next ) => {
  debugger;
} ).setNextSuccessor( ( data, next ) => {
  debugger;
} ).
  exec( 123, 123 ); */

